console.log("Signup frontend javascript file");

$(function () {
  /* ── Timestamp ── */
  const tsTarget = $("#ts");
  function tick() {
    const now = new Date();
    tsTarget.text(now.toTimeString().slice(0, 8));
  }
  tick();
  setInterval(tick, 1000);

  /* ── Ticker ── */
  const TICKER =
    "BIKE ADMIN · SECURE REGISTRATION · AUTHORIZED ACCESS ONLY · CREATE YOUR ACCOUNT · ";
  $("#ticker").text(TICKER.repeat(8));

  /* ── Profile image upload ── */
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
      $(this).siblings(".uploads-name").val(filename);
    }
  });

  /* ── Password show / hide ── */
  const pwdTarget = $(".member-password");
  const pwdToggle = $(".pwd-toggle");

  pwdToggle.on("click", function () {
    const show = pwdTarget.attr("type") === "password";
    pwdTarget.attr("type", show ? "text" : "password");
    $(this).text(show ? "HIDE" : "SHOW");
  });

  /* ── Password strength meter ── */
  const strengthSegs = $(".strength-seg");
  const strengthLabel = $(".strength-label");
  const STRENGTH_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
  const STRENGTH_LABELS = ["Weak", "Fair", "Good", "Strong"];

  pwdTarget.on("input", function () {
    const val = $(this).val();
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^a-zA-Z0-9]/.test(val)) score++;

    strengthSegs.each(function (i) {
      $(this).css(
        "background",
        i < score ? STRENGTH_COLORS[score - 1] : "var(--border)",
      );
    });
    strengthLabel.text(val.length ? STRENGTH_LABELS[score - 1] || "" : "—");
    strengthLabel.css(
      "color",
      val.length ? STRENGTH_COLORS[score - 1] : "var(--muted)",
    );
  });

  /* ── Submit ── */
  $("#signupForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateSignupForm()) return;
    submitSignupForm();
  });
});

function validateSignupForm() {
  const memberNick = $(".member-nick").val(),
    memberPhone = $(".member-phone").val(),
    memberPassword = $(".member-password").val(),
    confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please fullfill all the required fields!");
    return false;
  }

  if (!/^\+?[\d\s\-().]{7,20}$/.test(memberPhone)) {
    alert("Please insert a valid phone number!");
    return false;
  }

  if (memberPassword.length < 8) {
    alert("Password must be at least 8 characters!");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs, Please check and try again!");
    return false;
  }

  const memberImageFile = $(".member-image").get(0).files[0];
  //   const memberImage = memberImageFile ? memberImageFile.name : null;
  //   if (!memberImage) {
  //     alert("Please insert profile image!");
  //     return false;
  //   }

  return true;
}

function submitSignupForm() {
  const submitBtn = $("#submitBtn");

  const formData = new FormData();

  formData.append("userAuth", $(".member-auth").val());
  formData.append("userNick", $(".member-nick").val());
  formData.append("userPhone", $(".member-phone").val());
  formData.append("userPassword", $(".member-password").val());

  const image = $(".member-image").get(0).files[0];

  if (image) {
    formData.append("userImage", image);
  }

  submitBtn.prop("disabled", true).addClass("loading");

  $.ajax({
    url: "/admin/signup",
    method: "POST",

    // IMPORTANT
    data: formData,
    processData: false,
    contentType: false,
  })
    .done(function (data) {
      const user = data.user;
      const accessToken = data.accessToken;

      flash(
        "success",
        `Welcome, ${(user && user.userNick) || "rider"}! Redirecting to dashboard…`,
      );

      setTimeout(function () {
        window.location.href = "/admin";
      }, 1400);
    })
    .fail(function (xhr) {
      const data = xhr.responseJSON || {};

      flash("error", data.message || "Registration failed. Please try again.");
    })
    .always(function () {
      submitBtn.prop("disabled", false).removeClass("loading");
    });
}
function flash(type, msg) {
  $("#flashMsg")
    .text(msg)
    .attr("class", "flash " + type)
    .show();
}
