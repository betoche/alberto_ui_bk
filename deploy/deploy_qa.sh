print_title_with_color() {
  echo "*** \033[33m$1\033[0m"
}

deploy_new_code_to_server() {
  print_title_with_color "DEPLOYING"
  if rsync -r dist/* deploy@35.237.38.60:/home/deploy/ui/tot_pharmaceutical_company_dashboard/; then
    printf '**** FINISHED ****\n'
  else
    printf '***********************\n'
    printf '**** Upload Failed ****\n'
    printf '***********************\n'
  fi
}

full_deployment() {
  print_title_with_color "BUILD"
  if npm run buildQA; then
    deploy_new_code_to_server
  else
    printf '**********************\n'
    printf '**** Build Failed ****\n'
    printf '**********************\n'
  fi
}

full_deployment
