const userBox = document.getElementById("git-user");
const searchUserInput = document.getElementById("search-user-input");

const loading = () => {
	userBox.innerHTML = `
  <div class="loading">
    loading
  </div>`;
};

const processing = async (server, box, method) => {
	const response = await fetch(server, {
		method: method,
	});

	const responseResult = await response.json();

	if (response.ok) {
		getGitUser(responseResult);
	} else {
		box.innerHTML = `
  
    <div class="error">
      <div class="error__title">
      ${responseResult.message}
      </div>
    </div>
  `;
	}
};

const loadGitUser = async (e) => {
	loading();
	let server = `https://api.github.com/users/labcap`;

	document.addEventListener("keypress", async (e) => {
		if (e.key === "Enter") {
			loading();

			server = `https://api.github.com/users/${
				searchUserInput.value.length > 0 ? searchUserInput.value : "labcap"
			}`;

			processing(server, userBox, "GET");
		}
	});

	processing(server, userBox, "GET");
};

const nothingInfo = (data) => {
	return data ? data : "nothing";
};

const getGitUser = (data) => {
	console.log(data);

	const template = `
  <div class="user">
    <div class="user__box">
      <div class="user__img"><img src=${data.avatar_url} alt="user-img"/></div>
      <div class="user__info user__name"><b>Name:</b><span>
      ${nothingInfo(data.name)}
      </span></div>
      <div class="user__info user__login"><b>Login:</b><span>
      ${nothingInfo(data.login)}
      </span></div>
    </div>

    <div class="user__box">
      <div class="user__info user__url"><b>Url to github:</b><a href="${
				data.html_url
			}" target="_blank">${nothingInfo(data.html_url)}</a></div>
      <div class="user__info user__blog"><b>Blog:</b><a href="${
				data.blog
			}" target="_blank">
      ${nothingInfo(data.blog)}
      </a></div>
      <div class="user__info user__pub-repo"><b>Public repos:</b><span>
      ${nothingInfo(data.public_repos)}
      </span></div>
      <div class="user__info user__data"><b>Created an account:</b><span>
      ${nothingInfo(data.created_at)}
      </span></div>
      <div class="user__info user__follow-box">
        <div class="user__followers"><b>Followers:</b><span>
        ${nothingInfo(data.followers)}</span></div>
        <div class="user__following"><b>Following:</b><span>
        ${nothingInfo(data.following)}
        </span></div>
      </div>
    </div>
  </div>
  `;

	userBox.innerHTML = template;
};

if (userBox) {
	loadGitUser();
}
