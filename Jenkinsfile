
node {

    

    def git = checkout scm
    stage("Build") {
        clean {
        sh 'echo I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh 'git clean -dfxq'
        sh 'git stash'
        }
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "docker login --username afk0901 --password LUNDIogfanta199"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

    stage("Lint") {
        dir("./game_api") {
            sh "npm install"
            sh "npm install eslint --save-dev"
            sh "npm run eslint"
        }
    }
}