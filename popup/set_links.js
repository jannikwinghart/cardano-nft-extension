
function generate_cnftjungle_url(project_name_cnftjungle){
  if (project_name_cnftjungle == null){
    return "https://cnftjungle.io"
  }else{
    return "https://cnftjungle.io/collections/" + project_name_cnftjungle
  }
}

function generate_cnfttools_url(project_name_cnfttools){
  if (project_name_cnfttools == null){
    return "https://cnft.tools"
  }else{
    return "https://cnft.tools/" + project_name_cnfttools
  }
}

function generate_opencnft_url(project_name_opencnft){
  if (project_name_opencnft == null){
    return "https://opencnft.io"
  }else{
    return "https://opencnft.io/" + project_name_opencnft
  }
}

function generate_tokenref_url(project_name_tokenref){
  if (project_name_tokenref == null){
    return "https://tokenref.com"
  }else{
    return "https://" + project_name_tokenref + ".tokenref.com/"
  }
}

function generate_cnftio_url(project_name_cnftio){
  if (project_name_cnftio == null){
    return "https://cnft.io"
  }else{
    return "https://cnft.io/project/" + project_name_cnftio
  }
}

function generate_nftjam_url(project_name_nftjam){
  if (project_name_nftjam == null){
    return "https://nftjam.io"
  }else{
    return "https://nftjam.io/" + project_name_nftjam
  }
}

function generate_genesis_url(project_name_genesis){
  if (project_name_genesis == null){
    return "https://genesishouse.io"
  }else{
    return "https://genesishouse.io/collections/" + project_name_genesis
  }
}

function generate_website_url(project_name_website){
  return project_name_website
}

function generate_discord_url(project_name_discord){
  if (project_name_discord == null){
    return null
  }else{
    return "https://discord.gg/" + project_name_discord
  }
}

function generate_twitter_url(project_name_twitter){
  if (project_name_twitter == null){
    return null
  }else{
    return "https://twitter.com/" + project_name_twitter
  }
}

function generate_url(website_name, website_project_name){
  console.log(website_name)
  if(website_name == "cnftjungle"){
    url = generate_cnftjungle_url(website_project_name)
  }else if(website_name == "cnfttools"){
    url = generate_cnfttools_url(website_project_name)
  }else if(website_name == "opencnft"){
    url = generate_opencnft_url(website_project_name)
  }else if(website_name == "tokenref"){
    url = generate_tokenref_url(website_project_name)
  }else if(website_name == "cnftio"){
    url = generate_cnftio_url(website_project_name)
  }else if(website_name == "nftjam"){
    url = generate_nftjam_url(website_project_name)
  }else if(website_name == "genesis"){
    url = generate_genesis_url(website_project_name)
  }else if(website_name == "website"){
    url = generate_website_url(website_project_name)
  }else if(website_name == "discord"){
    url = generate_discord_url(website_project_name)
  }else if(website_name == "twitter"){
    url = generate_twitter_url(website_project_name)
  }
  console.log(url)
  return url
}

function update_link(website_name, project_list, project_key){
  if(project_key == "null"){
    if(website_name == "website" || website_name == "discord" || website_name == "twitter"){
      $("#project_link_"+website_name).attr("href", generate_url(website_name, null)).addClass("link_disabled");
    }else{
      $("#project_link_"+website_name).attr("href", generate_url(website_name, null)).removeClass("link_disabled");
    }
  }else{
    var website_project_name = project_list[project_key][website_name + "_name"]
    console.log("website_project_name " + website_project_name)
    if(website_project_name == null){
      $("#project_link_"+website_name).addClass("link_disabled");
    }else{
      $("#project_link_"+website_name).attr("href", generate_url(website_name, website_project_name)).removeClass("link_disabled");
    }
  }
}

function select_project(project_list, project_key){
  console.log("select project " + project_key)

  website_names = [
    "cnftjungle",
    "cnfttools",
    "opencnft",
    "tokenref",
    "cnftio",
    "nftjam",
    "genesis",
    "twitter",
    "discord",
    "website"
  ]

  website_names.forEach(website_name => {
    update_link(website_name, project_list, project_key)
  });
}
