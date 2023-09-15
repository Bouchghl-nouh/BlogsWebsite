 
function DeleteBlog(id) {
  console.log(id);
  const element = document.getElementById(id);
  element.remove();
  fetch(`/blog/delete/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    Body:({ id: id }),
    Cache: 'default'
  }).then(response => {
    console.log(response);
  }).catch(err => {
    console.log(err);
  })
  console.log("request was sended")
}