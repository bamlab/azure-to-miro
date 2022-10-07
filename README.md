# Azure Devops to miro

## Introduction

Azure Devops is a great tool to User Story specifications. Miro is a great tool for *visual management*, let's transfer work items from Azure Devops into Miro.

## Usage

`npx azure-to-miro {workItemId} [-t THEME_NAME]`

`azure-to-miro` recursively imports children of the `workItemId` to import.

## Configuration

All the settings are available in the `.env.template`.

```sh
ATM_MIRO_API_URL=https://api.miro.com/v1
ATM_MIRO_API_KEY=
ATM_MIRO_BOARD_ID=
ATM_MIRO_OFFSET=420

ATM_AZURE_API_TOKEN=
ATM_AZURE_PROJET_URL=
ATM_AZURE_ORGANISATION=
ATM_AZURE_PROJECT=

ATM_THEME_TODO="#2D9BF0"
ATM_THEME_DONE="#7bed9f"
ATM_THEME_BUG="#e84118"

ATM_THEME_CUSTOM_TODO="#2D9BF0"
ATM_THEME_CUSTOM_DONE="#7bed9f"
ATM_THEME_CUSTOM_BUG="#e84118"
```

You should copy those environment variables wherever the rest of your system's variables live.

For example:

1. if you're using zsh, take a look in your home directory's .zshrc file
2. if you're using bash, take a look at your bash_profile file
3. if you're using fish, use set -gx key value in your ~/.config/fish/config.fish file

Note that the `export` bit is pretty key, to make sure that they are globally available. To check that the variables have been set correctly, you can print them in the terminal -- for example, echo `$ATM_MIRO_BOARD_ID`.

## Specific project

You can add multiple project by prefixing with your custom project ID.

example: `ATM_MIRO_BOARD_ID` can become `SPECIFIC_PROJECT_ATM_MIRO_BOARD_ID` and `SECOND_SPECIFIC_PROJECT_ATM_MIRO_BOARD_ID`.

And you can use it this way: `npx transfer 123 -p=SPECIFIC_PROJECT`

## Custom theme

You can add multiple color theme if you want to customize.

If you set custom `ATM_THEME_[THEME_NAME]_TODO`, `azure-to-miro` will use it with the option `-t|--template THEME_NAME`.
