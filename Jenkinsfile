pipeline {
  agent any

	tools {
		nodejs "NodeJS"
	}
	
	environment {
		PROJECT_ID = 'tech-rnd-project'
                CLUSTER_NAME = 'network18-cluster'
                LOCATION = 'us-central1-a'
                CREDENTIALS_ID = 'kubernetes'	
		

	}
	
    stages {
	    stage('Scm Checkout') {
		    steps {
			    	checkout scm
		    }
	    }
      
      stage('build') {
              steps {
                  echo 'building the software'
		  //sh 'npm install --save-dev mocha-sonar-reporter'
		 // sh "npm install mocha-sonar-generic-test-coverage --save-dev"
		 // sh "mocha --reporter mocha-sonar-generic-test-coverage test"
		      sh 'rm package-lock.json'
		  	sh 'rm -rf node_modules'
		  
		 sh 'npm install --save module_name'
		  sh "npm install sonar-scanner"
		  
                  sh 'npm install'
              }
      }
      
       stage('SonarQube analysis') {
        	steps{
        		withSonarQubeEnv('sonarqube-9.7.1') { 
				//sh "npm run coverage-lcov"
				//sh 'sonar -Dsonar.projectKey=divya'
		  		
		 		 sh "npm test"
				
				sh "npm run sonar"
				
    			  }
        	}
        }
    }
}
