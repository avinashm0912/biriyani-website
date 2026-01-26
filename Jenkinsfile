pipeline {
  agent any

  environment {
    AWS_DEFAULT_REGION = "ap-south-1"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/avinashm0912/biriyani-website.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install || true'
      }
    }

    stage('Deploy to Amplify') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-jenkins']]) {
          sh '''
          aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
          aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
          aws configure set region ap-south-1

          aws amplify start-job \
            --app-id d8pqeupd7bqsz \
            --branch-name main \
            --job-type RELEASE
          '''
        }
      }
    }
  }
}
