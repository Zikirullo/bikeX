console.log("Signup frontend javascript file");

$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0],
        fileType = uploadFile["type"],
        validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpg, jpeg and png format files");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("Success");
        }
        filename = $(this)[0].files[0].name;
      }
      $(this).siblings(".upload-name").val(filename);
    }
  });
});

function validateSignupForm() {
  const userNick = $(".user-nick").val(),
    userPhone = $(".user-phone").val(),
    userPassword = $(".user-password").val(),
    confirmPassword = $(".confirm-password").val();

  if (
    userNick === "" ||
    userPhone === "" ||
    userPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please fullfill all the required fields!");
    return false;
  }
  if (userPassword !== confirmPassword) {
    alert("Password differs, Please check and try again!");
    return false;
  }

  const userImage = $(".user-image").get(0).files[0].name
    ? $(".user-image").get(0).files[0].name
    : null;
  if (!userImage) {
    alert("Please insert profile image!");
    return false;
  }
}
