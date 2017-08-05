%NODE_ENV% = Production
forever start -l c:\uccss\forever-log\forever.log -o .\forever-log\out.log -e .\forever-log\error.log -w index.js