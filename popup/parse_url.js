
function parse_cnftio_url(project_list, url){
  console.log(url)

  project_position = url.search("project");
  url_second_part = url.slice(project_position+8);
  parsed_project_name = url_second_part.split("&")[0];

  // todo: parse project name from offer

  console.log("parsed " + parsed_project_name);

  parsed_project_key = Object.keys(project_list).find(key => project_list[key]["cnftio_name"] == parsed_project_name)
  console.log(parsed_project_key)

  return parsed_project_key
}

function parse_cnfttools_url(project_list, url){
  console.log(url)
  url_second_part = url.split("cnft.tools/")[1];
  parsed_project_name = url_second_part.split(/&|#/)[0];
  console.log("parsed " + parsed_project_name);

  parsed_project_key = Object.keys(project_list).find(key => project_list[key]["cnfttools_name"] == parsed_project_name)
  console.log(parsed_project_key)

  return parsed_project_key
}

function parse_cnftjungle_url(project_list, url){
  console.log(url)
  parsed_project_name = url.split("collections/")[1];
  console.log("parsed " + parsed_project_name);

  parsed_project_key = Object.keys(project_list).find(key => project_list[key]["cnftjungle_name"] == parsed_project_name)
  console.log(parsed_project_key)

  return parsed_project_key
}

function parse_opencnft_url(project_list, url){
  console.log(url)
  parsed_project_name = url.split("opencnft.io/")[1];
  console.log("parsed " + parsed_project_name);

  parsed_project_key = Object.keys(project_list).find(key => project_list[key]["opencnft_name"] == parsed_project_name)
  console.log(parsed_project_key)

  return parsed_project_key
}

function parse_tokenref_url(project_list, url){
  console.log(url)
  if(url.startsWith("https://")){
    url = url.substring(8)
  }
  url.split(".tokenref")[0];
  parsed_project_name = url.split(".tokenref")[0];
  console.log("parsed " + parsed_project_name);

  parsed_project_key = Object.keys(project_list).find(key => project_list[key]["tokenref_name"] == parsed_project_name)
  console.log(parsed_project_key)

  return parsed_project_key
}

function parse_nftjam_url(project_list, url){
  console.log(url)
  parsed_project_name = url.split("nftjam.io/")[1];
  console.log("parsed " + parsed_project_name);

  if(parsed_project_name == null){
    return null
  }else{
    parsed_project_key = Object.keys(project_list).find(key => project_list[key]["nftjam_name"] == parsed_project_name)
    console.log(parsed_project_key)
    return parsed_project_key
  }
}

function parse_genesis_url(project_list, url){
  console.log(url)
  parsed_project_name = url.split("genesishouse.io/collections/")[1];
  console.log("parsed " + parsed_project_name);

  parsed_project_key = Object.keys(project_list).find(key => project_list[key]["genesis_name"] == parsed_project_name)
  console.log(parsed_project_key)
  console.log(project_list["AdaSenshi Ninja"]);

  return parsed_project_key
}

function parse_url(project_list){
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      let url = tabs[0].url;

      parsed_project_key = null;

      // parse urls
      if(url.includes("cnftjungle.io")){
        parsed_project_key = parse_cnftjungle_url(project_list, url)
      }else if(url.includes("cnft.tools")){
        parsed_project_key = parse_cnfttools_url(project_list, url)
      }else if(url.includes("opencnft.io")){
        parsed_project_key = parse_opencnft_url(project_list, url)
      }else if(url.includes("tokenref.com")){
        parsed_project_key = parse_tokenref_url(project_list, url)
      }else if(url.includes("cnft.io")){
        parsed_project_key = parse_cnftio_url(project_list, url)
      }else if(url.includes("nftjam.io")){
        parsed_project_key = parse_nftjam_url(project_list, url)
      }else if(url.includes("genesishouse.io/collections")){
        parsed_project_key = parse_genesis_url(project_list, url)
      }

      /*if(parsed_project_key == null){
        new Promise((resolve, reject) => {
          if(url.includes("cnft.io/token")){
            // todo: load stored_selected_project_key
            chrome.storage.sync.get("cnftio_token_project_name", function(data){
              cnftio_token_project_name = data["cnftio_token_project_name"]
              parsed_project_key = Object.keys(project_list).find(key => project_list[key]["cnftio_name"] == cnftio_token_project_name)
              resolve(parsed_project_key)
            });
          }else {
            // load selected project
            chrome.storage.sync.get("selected_project", function(selected_project){
              stored_selected_project_key = selected_project["selected_project"]
              resolve(stored_selected_project_key)
            });
          }
        }).then((stored_selected_project_key) => resolve(stored_selected_project_key));

      }else{
        resolve(parsed_project_key)
      }*/

      resolve(parsed_project_key)
    });
  });
}
