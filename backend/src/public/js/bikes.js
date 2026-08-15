console.log("Bikes frontend javascript file");

$(function () {
  $("#process-btn").on("click", () => {
    $(".bike-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });
  $("#cancel-btn").on("click", () => {
    $(".bike-container").slideToggle(200);
    $("#process-btn").css("display", "flex");
  });
  $(".new-bike-status").on("change", async function (e) {
    const id = e.target.id;
    const bikeStatus = $(`#${id}.new-bike-status`).val();

    try {
      const response = await axios.post(`/admin/bike/${id}`, {
        bikeStatus: bikeStatus,
      });
      console.log("response =>", response);
      const result = response.data;
      if (result.data) {
        $(".new-bike-status").blur();
      } else alert("Bike update failed");
    } catch (err) {
      console.log(err);
      alert("Bike update failed");
    }
  });
});

function validateForm() {
  const bikeBrandName = $(".bike-brand-name").val();
  const bikeName = $(".bike-name").val();
  const bikePrice = $(".bike-price").val();
  const bikeLeftCount = $(".bike-left-count").val();
  const bikeType = $(".bike-type").val();
  const bikeStatus = $(".bike-status").val();

  if (
    bikeBrandName === "" ||
    bikeName === "" ||
    bikePrice === "" ||
    bikeLeftCount === "" ||
    bikeType === "" ||
    bikeStatus === ""
  ) {
    alert("Pleae insert all details!");
    return false;
  } else return true;
}

function priviewFileHandler(input, order) {
  const imgClassName = input.className;
  console.log(input);

  const file = $(`.${imgClassName}`).get(0).files[0];
  const fileType = file["type"];
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpg, jpeg and png format files");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
