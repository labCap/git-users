const userBox = document.getElementById("git-user");
const searchUserInput = document.getElementById("search-user-input");

const loadGitUser = async (e) => {
	userBox.innerHTML = `
  <div class="loading">
    loading
  </div>`;

	let server = `https://api.github.com/users/labcap`;

	document.addEventListener("keypress", async (e) => {
		if (e.key === "Enter") {
			// code for enter

			server = `https://api.github.com/users/${
				searchUserInput.value.length > 0 ? searchUserInput.value : "labcap"
			}`;

			const response = await fetch(server, {
				method: "GET",
			});

			const responseResult = await response.json();

			if (response.ok) {
				getGitUser(responseResult);
			} else {
				userBox.innerHTML = responseResult.message;
			}
			console.log(server);
			console.log(searchUserInput.value);
		}
	});

	const response = await fetch(server, {
		method: "GET",
	});

	const responseResult = await response.json();

	if (response.ok) {
		getGitUser(responseResult);
	} else {
		userBox.innerHTML = responseResult.message;
	}
};

const getGitUser = (data) => {
	console.log(data);

	const template = `
  <div class="user">
    <div class="user__box">
      <div class="user__img"><img src=${data.avatar_url} alt="user-img"/></div>
      <div class="user__info user__name"><b>Name:</b><span>${data.name}</span></div>
      <div class="user__info user__login"><b>Login:</b><span>${data.login}</span></div>
    </div>

    <div class="user__box">
      <div class="user__info user__url"><b>Url to github:</b><a href="${data.html_url}" target="_blank">${data.html_url}</a></div>
      <div class="user__info user__blog"><b>Blog:</b><a href="${data.blog}" target="_blank">${data.blog}</a></div>
      <div class="user__info user__pub-repo"><b>Public repos:</b><span>${data.public_repos}</span></div>
      <div class="user__info user__data"><b>Created an account:</b><span>${data.created_at}</span></div>
      <div class="user__info user__follow-box">
        <div class="user__followers"><b>Followers:</b><span>${data.followers}</span></div>
        <div class="user__following"><b>Following:</b><span>${data.following}</span></div>
      </div>
    </div>
  </div>`;

	userBox.innerHTML = template;
};

if (userBox) {
	loadGitUser();
}
