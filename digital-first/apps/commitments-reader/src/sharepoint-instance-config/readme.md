# Instance config

This app is deployed as separate instances to multiple SharePoint sites. This folder contains templates of the configuration that needs to be provisioned in each instance.

## Convention

Subfolders in this folder represent the SharePoint list/library that the config needs to be provisioned into.

## Format

Config is persisted as json by default. However, SharePoint doesn't serve JSON properly :( We're using .txt files to workaround this excellent feature that totally makes sense.
