(function () {
        const selectors = ['.ltx_align_center','.ltx_align_left','.ltx_listing','.ltx_tabular','.ltx_graphics'].join(',');

        function getScrollHost(el) {
            let node = el;
            while (node && node !== document.body) {
                const style = getComputedStyle(node);
                const allowsScrollX = /(auto|scroll|overlay)/.test(style.overflowX);
                const hasHorizontalOverflow = node.scrollWidth > node.clientWidth + 1;
                if (allowsScrollX && hasHorizontalOverflow) return node;
                node = node.parentElement;
            }
            return el;
        }

        function attachScrollHandler(scrollHost){
            if (scrollHost._overflowHandler) return;
            const dismiss = ()=>{
                scrollHost.dataset.overflowDismissed = '1';
                scrollHost.classList.add('has-scrolled');
            };
            const onScroll = ()=>{
                // hide marker once the real horizontal scroller moved from start
                if (scrollHost.dataset.overflowDismissed === '1' || scrollHost.scrollLeft > 0) {
                    scrollHost.classList.add('has-scrolled');
                } else {
                    scrollHost.classList.remove('has-scrolled');
                }
            };
            scrollHost.addEventListener('scroll', onScroll, { passive: true });
            // hide marker on user interaction even before first scroll event
            scrollHost.addEventListener('pointerdown', dismiss, { passive: true });
            scrollHost.addEventListener('click', dismiss, { passive: true });
            // initial check in case element/host is already scrolled
            onScroll();
            scrollHost._overflowHandler = true;
        }

        function checkEl(el){
            const scrollHost = getScrollHost(el);
            const horiz = scrollHost.scrollWidth > scrollHost.clientWidth + 1;
            const vert  = scrollHost.scrollHeight > scrollHost.clientHeight + 1;
            scrollHost.classList.toggle('is-overflowing', horiz);
            scrollHost.classList.toggle('is-overflowing-vertical', vert);
            if (horiz) attachScrollHandler(scrollHost);
        }

        function scan(){
            document.querySelectorAll('.is-overflowing, .is-overflowing-vertical').forEach((node)=>{
                node.classList.remove('is-overflowing');
                node.classList.remove('is-overflowing-vertical');
            });
            document.querySelectorAll(selectors).forEach(checkEl);
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            scan();
            window.addEventListener('resize', scan);
            const mo = new MutationObserver(scan);
            document.querySelectorAll(selectors).forEach(node=>{
                mo.observe(node, { childList:true, subtree:true, characterData:true });
            });
        });
        })();