const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl:  'http://34.93.157.58:9000',
    projectName: 'spring-boot-complete',
    projectKey:'network',
    token: 'sqp_f741d02efb6d27d1a32f33fba69855545cdfc646',
    options : {
      'sonar.sources':  'src',
      'sonar.tests':  '__tests__',
      'sonar.exclusions': '**/*.test.*',
      'sonar.inclusions' :  '**',
      'sonar.test.inclusions':  '__tests__/**/*.test.js',
      'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info'
      
      
    }
  }, () => {});
