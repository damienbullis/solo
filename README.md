# SOLO

### <img style="float: right; max-height: 300px; margin-left: 2em; margin-bottom: 2em;" src="https://github.com/damienbullis/solo/blob/main/assets/solo-banner.png?raw=true" alt="SOLO Banner">

~~Find `SOLO` in the [Visual Studio Code Marketplace](#).~~

---

### Table of Contents

- [About](#about)
- [Usage](#usage)
- [Extension Settings](#extension-settings)
- [Roapmap](#roapmap)
- [Known Issues](#known-issues)

&nbsp;

&nbsp;

## About

In the VS Code Marketplace, there were some other extensions that did hiding and showing files, but they typically are focused on selecting the files you want to **_HIDE_** versus the files you want to **_SEE_**.

- With **1** click, hide all files except the ones you want to focus on.
- With **1** hotkey to toggle `soloMode` on/off.
- Use the default file explorer view.

&nbsp;

## Usage

Add some usage instructions here. and do a gif.

&nbsp;

## Extension Settings

General:

- #### **soloMode**
  - Turns the extension on/off.
- #### **solodFiles**
  - The files you want to focus on.

Keybindings:

- #### **alt + \`**
  - Toggles soloMode on/off.

&nbsp;

## Roapmap

- [ ] Get icons
  - [ ] For soloMode
  - [ ] File Decorations for solod files
- [ ] Finish error handling and user/system feedback
- [ ] Swap to clean repo
- [ ] Finish Readme
- [ ] Add in gifs / screenshots
- [ ] Publish to marketplace
- [ ] Add in badges
- [ ] Performance Improvements
  - [ ] Caching

&nbsp;

## Known Issues

Multiple vscode windows.

&nbsp;

### Problem

Because some projects can be set up to use the local `.vscode` folders as part of the repo and are not ignored by git, this would mean any time a user was using `solo`, it would be making changes to the `.vscode/settings.json` file in the repo, which means that the user would have to be careful not to commit these changes, and would show up in Source Control.

**Not Great.**

&nbsp;

### Solution (not ideal but works for now)

Was to use the global `settings.json` since those are outside of repos. This introduced the new issue of while multiple vscode windows are open, the global `files.exclude` settings are shared between all windows, so files will be hidden or shown in all windows. It also means that if you are in soloMode in one window, you will be in soloMode in all windows, which is also not ideal, but seemed like a better trade off than dealing with source control and messing with repo specific settings.
