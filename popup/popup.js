

function update_project_selection_list_widget(project_list){
  $("#current_project_select").empty();
  $("#current_project_select").append("<option value=null>Select project</option>")
  console.log(project_list)
  Object.keys(project_list).sort().forEach(project_key => {
    var option = $("<option></option>").attr("value", project_key).text(project_key);
    $("#current_project_select").append(option);
  })
}

function handle_select(){
  selected_project_key = $("#current_project_select").val()
  select_project(project_list, selected_project_key)
}

$(function(){
  // load project list
  project_list_promise = reload_project_list()

  // create select options based on project_list
  select_widget_promise = project_list_promise.then((project_list) => {
    update_project_selection_list_widget(project_list)
  })

  // parse url for selected project
  parse_url_promise = select_widget_promise.then(() => {
    parse_url(project_list).then((parsed_project_key) =>{
      // set current project
      if(parsed_project_key != null){
        $("#current_project_select").val(parsed_project_key);
        select_project(project_list, parsed_project_key);
      }
    })
  })

  // set change handler for project select widget
  parse_url_promise.then(() => {
    handle_select()
  })

  $("#current_project_select").on("change", handle_select)
})

// todo: ---- pre-release ----
// todo: create github
// todo: github link in popup and options
// todo: ask for permission for images

// todo: ---- features ----
// todo: add new projects
// todo: fetch projects from web

// todo: ---- organisatorisch ----
// todo: Entwicklerinformationen, Spendelink, github link, discord link
