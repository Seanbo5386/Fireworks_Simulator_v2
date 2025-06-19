varying vec4 vColor;

void main() {
    float d = length(gl_PointCoord - 0.5);
    if(d > 0.5) discard;
    gl_FragColor = vColor;
}
