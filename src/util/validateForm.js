export function validateForm(formIDsArr) {
    // Function to check if a given form is valid
    // Takes 1 array containing list of form input/select/choices ids as arguments
    // If form_ids is not an array, return
    if (!Array.isArray(formIDsArr)) return;

    // Iterate through the array, if an empty input is found, return false immediately
    for (let i = 0; i < formIDsArr.length; i++) {
        let input = document.querySelector(`#${formIDsArr[i]}`);
        if (input.value === '' || input.value === "default") return false;
    }

    // If no input is empty, return true;
    return true;
}