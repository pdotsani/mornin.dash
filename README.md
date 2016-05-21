# mornin.dash 

**A Chrome Extension that Provides the local Date and Weather**  

## Purpose  
  
To provide the user with the local time and weather when loading a new browser window or tab.  

## Status  

This project is in development. In it's current state, it can only be viewed as a client-side application in the browser. Chrome extension configuration will be added when the application approaches deployment.  

This project is currently private. If you think someone might like to help out, please contact me.  

## Setup

Here are some steps to set up your local enviornment prior to contributing to the project.

First, install the following dependencies globally if you don't have them already:  

- [npm](https://docs.npmjs.com/getting-started/installing-node)
- [bower](http://bower.io/#install-bower)  

Along with this chrome extension:  

- [COORS toggle](https://chrome.google.com/webstore/detail/cors-toggle/omcncfnpmcabckcddookmnajignpffnh)  

Next, fork the repo to your personal github account by clicking the fork buttion on the github page. This will allow you to freely experiment on the project without affecting master. It will also allow you to properly make contributions to the upstream (more on that later).  

Then, clone the fork to your local machine.  

`git clone https://github.com/your_forked_git_url`  

Now you can install local app dependencies by running the following commands in your local forked repo:  

```
npm install  
bower install  
```  
  
Finally, we can run the app locally by doing the following:

- Run COORS toggle by clicking on the extension icon  

- Start a local server by running `gulp watch` in your forked repo directory.  

	> If you get the following error message:  
	> ```
	> module.js:338 throw err; ^ Error: Cannot find module 'browser-sync' at Function.> Module._resolveFilename (module.js:336:15)> 
	> ```  
	> Just install the unmet dependency by running `npm install browser-sync --save-dev`

If you aren't redirected, open `http://localhost:3000/` in chrome.  

*When you're done working on the app, it's best to deactivate COORS toggle for security reasons.*

## Workflow  

Now that you have mornin.dash running locally on your system. You can start contributing! The general workfow is as follows:  

1. Fetch changes from master to make sure your fork is up to date:
	`git pull upstream master`  

2. Push these changes to your forked repo:  
	`git push`  

3. Create a new branch:  
	`git checkout -b new_branch_name`  

4. Hack away in your branch! Be sure to make a reasonable ammount of commits so changes can be easily reviewed during review.  

5. When you're ready to submit your changes, run `git push` in your branch.  

6. Open up the main repo in github at `https://github.com/pdotsani/mornin.dash`. You should see a notification that shows the branch you just pushed, alongside a green button to create a pull request. Go ahead and create the pull request.

	*Be sure to add a note directing someone to review your pull alongside any relevant issues the pull is addressing.*  

7. Eventually, someone will review your pull and merge the changes if everything checks out. If additional changes need to be made to the pull request, your can make them in additional commits on your local branch, then push those changes like you did in step 5.  

	*After a pull request is merged, the respective branch will also be removed to maintain a clean repository. Feel free to manage your local repo in whatever way works for you.*  

<hr>  

**Thanks for contributing! Hit me up if you have questions or need help. Happy coding...**
