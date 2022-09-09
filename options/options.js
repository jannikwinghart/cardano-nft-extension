function set_custom_project_metadata_download_link(){
  var custom_project_metadata_download_string = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(custom_project_list));
  $("#custom_metadata_file_download_link").attr("href", custom_project_metadata_download_string);
  $("#custom_metadata_file_download_link").attr("download", "custom_project_metadata.json");
}

function set_default_project_metadata_download_link(){
  var default_project_metadata_download_string = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(default_project_list));
  $("#default_metadata_file_download_link").attr("href", default_project_metadata_download_string);
  $("#default_metadata_file_download_link").attr("download", "default_project_metadata.json");
}

function set_effective_project_metadata_download_link(){
  var effective_project_metadata_download_string = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project_list));
  $("#effective_metadata_file_download_link").attr("href", effective_project_metadata_download_string);
  $("#effective_metadata_file_download_link").attr("download", "project_metadata.json");
}

function upload_custom_project_list(){
  var files = $('#metadata_file_upload')[0].files;
  if (files.length <= 0) {
    return false;
  }

  var filereader = new FileReader();
  filereader.onload = function(event) {
    var uploaded_custom_project_list = JSON.parse(event.target.result);
    chrome.storage.sync.set({custom_project_list: uploaded_custom_project_list})
    reload_options()
  }
  filereader.readAsText(files[0])
}

function render_custom_project_list(){
  console.log($("#custom_project_metadata_list_table"))
  $("#custom_project_metadata_list_table").find("tr:gt(0)").remove()
  if(Object.entries(custom_project_list).length == 0){
    empty_project_list_row = "<tr><td colspan='6'>No custom project metadata stored</td></tr>"
    $("#custom_project_metadata_list_table").append(empty_project_list_row)
  }else{
    Object.entries(custom_project_list).forEach(([project_name, project_metadata]) => {
      custom_project_list_row = "<tr><td>" +
        project_name +
        "</td><td>" +
        project_metadata["cnftio_name"] +
        "</td><td>" +
        project_metadata["cnftjungle_name"] +
        "</td><td>" +
        project_metadata["cnfttools_name"] +
        "</td><td>" +
        project_metadata["opencnft_name"] +
        "</td><td>" +
        project_metadata["override"] +
        "</td></tr>"
      $("#custom_project_metadata_list_table").append(custom_project_list_row)
    })
  }
}

function reload_options(){
  project_list_promise = reload_project_list()
  project_list_promise.then(() =>{
    set_custom_project_metadata_download_link();
    set_default_project_metadata_download_link();
    set_effective_project_metadata_download_link();
    render_custom_project_list();
  })
}

$(function(){
  reload_options()
  $("#import").on("click", upload_custom_project_list);
  $("#metadata_file_upload_button").on("click", () => $("#metadata_file_upload").click())
  $("#metadata_file_upload").on("change", () => {
    if($("#metadata_file_upload")[0].files.length > 0){
      filename = $("#metadata_file_upload")[0].files[0].name
      $("#metadata_file_upload_filename").text(filename)
    }else{
      $("#metadata_file_upload_filename").text("No file selected")
    }
  })
  $("#clear_custom_metadata_button").on("click", () => {
    chrome.storage.sync.set({custom_project_list: null})
    reload_options()
  })
})
