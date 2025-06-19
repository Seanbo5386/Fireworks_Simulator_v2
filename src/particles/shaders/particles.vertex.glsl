attribute vec3 aStartPosition;
attribute vec3 aVelocity;
attribute vec3 aColor;
attribute float aStartTime;
attribute float aLifeTime;

uniform float uTime;
uniform vec3 uGravity;

varying vec4 vColor;

void main() {
    float age = uTime - aStartTime;
    float life = clamp(1.0 - age / aLifeTime, 0.0, 1.0);
    vec3 pos = aStartPosition + aVelocity * age + 0.5 * uGravity * age * age;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 6.0 * life;
    vColor = vec4(aColor, life);
}
