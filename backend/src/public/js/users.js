console.log("Users frontend javascript file");

$(function () {
  $(".user-status").on("change", function (e) {
    const id = e.target.id,
      userStatus = $(`#${id}.user-status`).val();
    console.log("user-status", userStatus);

    axios
      .post("/admin/update/user", {
        _id: id,
        userStatus: userStatus,
      })
      .then((response) => {
        console.log(response);
        const result = response.data;
        console.log(result);
        if (result.data) {
          $(".user-status").blur();
        } else alert("FAIL!");
      })
      .catch((err) => {
        console.log(err);
        alert("User update failed");
      });
  });
});
