window.MathJax = {
    // MathJax configuration
    loader: {
      load: ['output/chtml']
    },

    /* output: {
        // break long lines
        displayOverflow: 'linebreak',  
        // options for when overflow is linebreak
        linebreaks: {                 
            // true for browser-based breaking of in-line equations 
            inline: true,                
            // a fixed size or a percentage of the container width   
            width: '90%',                 
            // the default lineleading in em units 
            lineleading: .2,              
            // The LinebreakVisitor to use  
            LinebreakVisitor: null,         
        }
    } */
};

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js';
  script.defer = true;
  document.head.appendChild(script);
})();
