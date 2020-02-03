
(function intializePg(params) {
    const design = document.getElementById('design');
    const color = document.getElementById('color');
    const jobRole = document.getElementById('title');
    
    document.getElementById('name').focus();
    document.getElementById('other-title').style.display= 'none';
    document.getElementById('colors-js-puns').style.display= 'none';
    design.firstElementChild.style.display = 'none';
    
    color.prepend(document.createRange()
        .createContextualFragment(
        `<option value='Please select a T-shirt theme' selected>Please select a T-shirt theme</option>`
    ));
    title.addEventListener('change', function(e){
        if (e.target.value === 'other') {
            document.getElementById('other-title').style.display= ''
            document.getElementById('other-title').focus();
        }else{
            document.getElementById('other-title').style.display= 'none';
        }
    });
    design.addEventListener('change', function(e){
        let chosenTheme = e.target.value.toString();
        if (color.children[0].value === 'Please select a T-shirt theme') {
            color.removeChild(color.children[0]);
        }
        if (chosenTheme === 'js puns') {
            document.getElementById('colors-js-puns').style.display= '';

            for (let i = 0; i < color.children.length; i++) {
                
                if (color.children[i].hasAttribute('selected')) {
                    color.children[i].removeAttribute('selected');
                }

                if (i < 3) {
                    if (i === 0) {
                        color.children[i].setAttributeNode(document.createAttribute('selected'));
                    }
                    color.children[i].style.display = '';
                }else{
                    color.children[i].style.display = 'none';
                }
            }
        }else if (chosenTheme === 'heart js') {
            document.getElementById('colors-js-puns').style.display= '';
            for (let i = 0; i < color.children.length; i++) {
                if (color.children[i].hasAttribute('selected')) {
                    color.children[i].removeAttribute('selected');

                }
                if (i < 3) {
                    color.children[i].style.display = 'none';
                }else{
                    if (i === 3) {
                        color.children[i].setAttributeNode(document.createAttribute('selected'));
                    }
                    color.children[i].style.display = '';
                }
            }
        }
    });
    
})();
    