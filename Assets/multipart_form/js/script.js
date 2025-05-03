let stepCount = 1;
let nextButton = $("#next");
let prevButton = $("#prev");

$("#step1").show();
$("#step2").hide();
$("#step3").hide();
$("#step4").hide();
$("#next").show();
$("#prev").hide();
nextButton.on("click", () => {
    checkInput(stepCount);
    if(checkInput(stepCount) == false){
        return;
    }
    stepCount++;
    showContent(stepCount);
})
prevButton.on("click", () => {
    stepCount--;
    showContent(stepCount);
})

function showContent() {
    $("#step1").hide();
    $("#step2").hide();
    $("#step3").hide();
    $("#step4").hide();
    $("#next").hide();
    $("#prev").hide();
    if(stepCount == 1){
        $("#step1").show();
        $("#next").show();
    } else
    if(stepCount == 2){
        $("#step2").show();
        $("#next").show();
        $("#prev").show();
    }else
    if(stepCount == 3){
        $("#step3").show();
        $("#next").show();
        $("#prev").show();
    }else
    if(stepCount == 4){
        $("#step4").show();
        $("#next").show();
        $("#prev").show();
    }else
    if(stepCount == 5){
        $("#step1").show();
        $("#step2").show();
        $("#step3").show();
        $("#step4").show();
        $("#next").hide();
        $("#prev").show();
    }
}
function checkInput(){
    if(stepCount == 1) {
        let step1Text = $("#step1 > input").val();
        const regex = /^\d+$/g;
        const found = step1Text.match(regex);
        if(found == null){
            $("#numberInput").addClass("invalid");
            return false;
        }
        if(isNaN(parseInt(step1Text))){
            $("#numberInput").addClass("invalid");
            return false;
        }
    }
    if(stepCount == 2) {
        let step2Text = $("#step2 > input").val();
        const regex = /^[a-zA-Z]+$/;
        const found = step2Text.match(regex);
        console.log(found);
        if(found == null){
            $("#letterInput").addClass("invalid");
            return false;
        }
    }
    if(stepCount == 3) {
        let step3Text = $("#step3 > input").val();
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const found = step3Text.match(regex);
        if(found == null){
            $("#specCharInput").addClass("invalid");
            return false;
        }
    }
    if(stepCount == 4) {
        let step4Text = $("#step4 > input").val();
        const regex = /[0-9()\-!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~]+/;
        const found = step4Text.match(regex);
        if(found == null){
            $("#numAndSpecCharInput").addClass("invalid");
            return false;
        }
    }
}