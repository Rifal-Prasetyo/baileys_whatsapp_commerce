const dateNow = new Date();
export function dateCheck(date) {
    const remindDay = 2;
    if(date + remindDay > dateNow.getDay()) {
        return true
    } else {
        return false;
    }
}