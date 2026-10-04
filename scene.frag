precision mediump float;

uniform vec2 u_mousePosition;
uniform float u_lightRadius;
uniform float u_time;
uniform vec2 u_eyeAlice;
uniform vec2 u_eyeZ;
uniform float u_eyeRadiusAlice;
uniform float u_eyeRadiusZ;
uniform float u_aspect;

varying vec2 v_position;

void main() {
    float d = distance(v_position, u_mousePosition);
    float light = 1.0 - smoothstep(0.0, u_lightRadius, d);

    // A subtle, animated gloss band in the lower part of the scene.
    // It gives the ground a readable stylized reflection without covering the art.
    float floorMask = 1.0 - smoothstep(0.28, 0.44, v_position.y);
    float wave = sin(v_position.x * 34.0 + u_time * 1.4 + sin(v_position.y * 22.0)) * 0.5 + 0.5;
    float reflection = floorMask * wave * 0.14;

    // The pointer removes the dark overlay instead of painting a white spot.
    float aliceDistance = length((v_position - u_eyeAlice) * vec2(u_aspect, 1.0));
    float zDistance = length((v_position - u_eyeZ) * vec2(u_aspect, 1.0));
    float aliceGlow = exp(-aliceDistance * aliceDistance / max(u_eyeRadiusAlice * u_eyeRadiusAlice, 0.00001));
    float zGlow = exp(-zDistance * zDistance / max(u_eyeRadiusZ * u_eyeRadiusZ, 0.00001));
    float eyeGlow = max(aliceGlow, zGlow);

    vec3 color = mix(vec3(reflection * 0.55), vec3(0.08, 1.0, 0.015), eyeGlow * 0.90);
    float opacity = clamp(0.38 * (1.0 - light) + eyeGlow * 0.50 + reflection * 0.2, 0.0, 0.88);
    gl_FragColor = vec4(color, opacity);
}
