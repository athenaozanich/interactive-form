/*     Global Variables     */
let infoLabel = document.createElement('LABEL');
let totalCost = 0.00;
const activitiesCntnr = document.querySelector('.activities');
(function intializePg() {//auto initialize default display values and append needed elements
    document.getElementById('name').focus();
    document.getElementById('other-title').style.display= 'none';
    document.getElementById('colors-js-puns').style.display= 'none';
    document.getElementById('design').firstElementChild.style.display = 'none';

    document.getElementById('payment').firstElementChild.style.display = 'none';
    document.getElementById('payment').children[1].setAttributeNode(document.createAttribute('selected'));

    document.getElementById('paypal').style.display= 'none';
    document.getElementById('bitcoin').style.display= 'none';
    
    activitiesCntnr.appendChild(infoLabel);
    infoLabel.setAttribute('id', 'totalCost');
    infoLabel.append(document.createTextNode(`Your total cost: $${totalCost}.00`));
})();
/*     Event Listeners      */
document.getElementById('title').addEventListener('change', function(e){//hide and show additional input field for other title
    if (e.target.value === 'other') {
        document.getElementById('other-title').style.display= ''
        document.getElementById('other-title').focus();
    }else{
        document.getElementById('other-title').style.display= 'none';
    }
});
document.getElementById('design').addEventListener('change', function(e){//hide and show color options based on theme selected
    let chosenTheme = e.target.value.toString();
    
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
activitiesCntnr.addEventListener('change', function(e){//disable conflicting events update cost

    let eventEl = e.target;
    let cost = parseInt(eventEl.getAttribute('data-cost'));
    let dateTime = e.target.getAttribute('data-day-and-time');
    let activities = activitiesCntnr.querySelectorAll('input');
    if (eventEl.checked === true) {
        totalCost = totalCost+cost;
    } else {
        totalCost = totalCost-cost;
    }
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].getAttribute('data-day-and-time') === dateTime && activities[i] != eventEl) {
            if (eventEl.checked === true) {
                activities[i].setAttribute('disabled', '');
            }else{
                activities[i].removeAttribute('disabled');
            }
        }
    }
    infoLabel.textContent = `Your total cost: $${totalCost}.00`;
});
document.getElementById('payment').addEventListener('change', function (e) {//hide and show payment section based on user choice
    let paymentType = e.target.value.toString();
    if (paymentType === "credit card") {
        document.getElementById('credit-card').style.display= '';
        document.getElementById('paypal').style.display= 'none';
        document.getElementById('bitcoin').style.display= 'none';
    }
    if(paymentType === "paypal"){
        document.getElementById('paypal').style.display= '';
        document.getElementById('credit-card').style.display= 'none';
        document.getElementById('bitcoin').style.display= 'none';
    }
    if(paymentType === "bitcoin"){
        document.getElementById('bitcoin').style.display= '';
        document.getElementById('credit-card').style.display= 'none';
        document.getElementById('paypal').style.display= 'none';
    }
});
document.getElementById('mail').addEventListener('keyup', function(){//real-time email validation
    let emailVal = document.getElementById('mail');
    if(document.getElementById('mail-error')){
        document.getElementById('mail-error').remove()
    }
    if (!emailVal.value.match(/^\w+[.]?[@][A-Za-z]+[.][A-Za-z]{3}$/)) {
        let emailErrorMsg = document.createRange().createContextualFragment(
        `<p id="mail-error">*ERROR: Looks like your email is either incomplete or not properly formatted!*</p>`
        );
        document.querySelector('form fieldset').insertBefore(emailErrorMsg, emailVal.nextSibling );
    }
});
document.querySelector('[type="submit"]').addEventListener('click', function (e) {//call master validation function or prevent default on non-validation
    if (!validateForm()){event.preventDefault();}
});
/*   Validation Functions   */
function basicInfoVal() {//validate name and email values to enure not empty and meets format requirements
    let parentFieldset = document.querySelector('form fieldset');
    let nameErrorMsg = document.createRange()
    .createContextualFragment(
      `<p id="name-error">*ERROR: We'll need your name to complete this transaction!*</p>`
     );
    let emptyEmailMsg = document.createRange().createContextualFragment(
        `<p id="mail-error">*ERROR: We'll need your email to complete this transaction!*</p>`
        );
     let frmtEmailErrorMsg = document.createRange()
    .createContextualFragment(
        `<p id="mail-error">*ERROR: Looks like your email is either incomplete or not properly formatted!*</p>`
     );
    let nameVal = document.getElementById('name');
    let emailVal = document.getElementById('mail');
    let result = false;
    if(document.getElementById('name-error')){
        document.getElementById('name-error').remove()
    }
    
    if (!nameVal.value.trim()) {
        parentFieldset.insertBefore(nameErrorMsg, nameVal.nextSibling );
    }
    if (!emailVal.value.trim()) {
        if(document.getElementById('mail-error')){
            document.getElementById('mail-error').remove()
        }
    
        parentFieldset.insertBefore(emptyEmailMsg, emailVal.nextSibling );
    }else if (!emailVal.value.match(/^\w+[.]?[@][A-Za-z]+[.][A-Za-z]{3}$/)) {
        if(document.getElementById('mail-error')){
            document.getElementById('mail-error').remove()
        }
    
        parentFieldset.insertBefore(frmtEmailErrorMsg, emailVal.nextSibling );
    }
    if (nameVal.value.trim() && 
        emailVal.value.trim() && 
        emailVal.value.match(/^\w+[.]?[@][A-Za-z]+[.][A-Za-z]{3}$/)) {
        return true;
    }else{
        return result;
    }
}
function activitiesVal() {//validate activities section to ensure at least one activity has been selected
    let activities = activitiesCntnr.querySelectorAll('[type="checkbox"]');
    let activityErrorMsg = document.createRange()
    .createContextualFragment(
      `<p id="activity-error">*ERROR: We'll need you to choose an activity to complete this transaction!*</p>`
     );
     let itemsChecked = 0;
     let result = false;
    if (document.getElementById('activity-error')){
        document.getElementById('activity-error').remove();
    }
    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        if (activities[i].checked) {
            itemsChecked++;
        }
    }
    if (itemsChecked >= 1) {
        return true;
    }else{
        activitiesCntnr.insertBefore(activityErrorMsg, infoLabel.nextSibling );
        result = false;
    }
}
function payTypeVal() {//validate payment type and if type is credit card the validate card info
    let ccValParent = document.querySelector('.col-6');
    let cvvZipVal = document.querySelectorAll('.col-3');
    let ccVal = document.getElementById('cc-num');
    let zipVal = document.getElementById('zip');
    let cvvVal = document.getElementById('cvv');
    let ccErrorMsg = document.createRange()
    .createContextualFragment(
      `<p id="cc-error">*ERROR: We'll need your card number to complete this transaction!*</p>`
     );
    let zipErrorMsg = document.createRange()
    .createContextualFragment(
      `<p id="zip-error">*ERROR: We'll need your billing zip to complete this transaction!*</p>`
     ); 
     let cvvErrorMsg = document.createRange()
    .createContextualFragment(
      `<p id="cvv-error">*ERROR: We'll need your 3-digit cvv to complete this transaction!*</p>`
     ); 
    let payType = document.getElementById('payment').value;
    let result = false;
    if(document.getElementById('cc-error')){
        document.getElementById('cc-error').remove()
    }
    if(document.getElementById('zip-error')){
        document.getElementById('zip-error').remove()
    }
    if(document.getElementById('cvv-error')){
        document.getElementById('cvv-error').remove()
    }
    if (payType === 'credit card') {
        if (!document.getElementById('cc-num').value.match(/^[\d]{13,16}$/)) {
            ccValParent.insertBefore(ccErrorMsg, ccVal.nextSibling);
        }
        if (!document.getElementById('zip').value.match(/^[\d]{5}$/)) {
            cvvZipVal[0].insertBefore(zipErrorMsg, zipVal.nextSibling);
        }
        if (!document.getElementById('cvv').value.match(/^[\d]{3}$/)) {
            cvvZipVal[1].insertBefore(cvvErrorMsg, cvvVal.nextSibling);
        }
        if (document.getElementById('cc-num').value.match(/^[\d]{13,16}$/) && 
            document.getElementById('zip').value.match(/^[\d]{5}$/) && 
            document.getElementById('cvv').value.match(/^[\d]{3}$/)) {
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    }
}
function validateForm() {//master validation function which checks each form section's validation function for passing
    firstVal = basicInfoVal();
    secondVal = activitiesVal();
    thirdVal = payTypeVal();
    if (firstVal && secondVal && thirdVal) {
        return true;
    }else{
        return false;
    }
}