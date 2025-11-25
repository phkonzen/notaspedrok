(function () {
        const selectors = ['.ltx_align_center','.ltx_align_left','.ltx_listing','.ltx_graphics','.ltx_tabular'].join(',');

        function attachScrollHandler(el){
            if (el._overflowHandler) return;
            const onScroll = ()=>{
                // hide marker when content is scrolled away from start,
                // show marker again when scrolled back to initial position.
                if (el.scrollLeft > 0) {
                    el.classList.add('has-scrolled');
                } else {
                    el.classList.remove('has-scrolled');
                }
            };
            el.addEventListener('scroll', onScroll, { passive: true });
            // pointerdown/touch may start interaction; run a quick check
            el.addEventListener('pointerdown', ()=> setTimeout(onScroll, 0), { passive: true });
            // initial check in case element already scrolled
            onScroll();
            el._overflowHandler = true;
        }

        function checkEl(el){
            const horiz = el.scrollWidth > el.clientWidth + 1;
            const vert  = el.scrollHeight > el.clientHeight + 1;
            el.classList.toggle('is-overflowing', horiz);
            el.classList.toggle('is-overflowing-vertical', vert);
            if (horiz) attachScrollHandler(el);
        }

        function scan(){
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