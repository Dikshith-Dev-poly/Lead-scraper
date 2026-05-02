export function wait(delay = 0) {
    return new Promise((res) => setTimeout(res, delay + Math.random() * 5000));
}