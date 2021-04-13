# 100mslive sdk tests
An example of running tests as a native ES6 modules in a browser. Since 100mslive sdk is dependent internally on a lot of browser apis, we are running tests inside browser environment.

# Depenencies
  * @100mslive/hmsvideo-web: sdk under test
  * mocha: test runner
  * playwright : for launching browser Programmatically
  * chai: assertion library
  * webpack: module bundler.
  * If browser supports ES6 modules — the are used. 
  * If browser does not support ES6 modules — the page fallbacks to bundled script.

## Run locally
1. Clone the repo:
    ```bash
    git clone git@github.com:sahil-sdet/100mslive-sdk-tests.git
    cd 100mslive-sdk-tests
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build non-es6 version:
    ```bash
    npm run build
    ```
4. run http-server -p 8080
5. Go to http://127.0.0.1:8080 in browser & see the tests running.
6. Or Skip steps 4 & 5 and run below command. It will lauch browser programmatically & start running tests. If you face port already allocated error, please open Activity Monitor & kill the appropriate process.
    ```bash
    npm run test
    ```

# Pending Improvements
  * Reporting support
  * Remove harcoding & make configs
  * Environment Support
  * Parallel Testing Support
  * and many more. 
