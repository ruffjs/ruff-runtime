We use subtree to add ruff_modules project to ruff.

If you want update ruff_modules in ruff, follow this steps:

1. Add ruff_module as a remote repository of ruff.

		git remote add -f ruff_modules git@git.nanchao.org:ruff/ruff_modules.git

2. Update ruff_modules, and merge it to ruff.
 
		git fetch ruff_modules master  
		git subtree pull --prefix ruff_modules ruff_modules master --squash