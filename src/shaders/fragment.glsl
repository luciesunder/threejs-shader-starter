uniform float uTime;
varying vec2 vUv;

void main() {
    // Simple color gradient based on UV coordinates and time
    vec3 color1 = vec3(0.1, 0.3, 0.9);
    vec3 color2 = vec3(0.9, 0.1, 0.3);
    vec3 finalColor = mix(color1, color2, sin(vUv.x * 5.0 + uTime) * 0.5 + 0.5);

    gl_FragColor = vec4(finalColor, 1.0);
}