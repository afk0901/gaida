node {
    def git = checkout scm
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
        sh "cat LUNDIogfanta199 | docker login --username afk0901 --password-stdin"
    }
}
