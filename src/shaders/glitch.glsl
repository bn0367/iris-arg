// adapted from https://www.shadertoy.com/view/lsfGD2

float sat(float t) {
    return clamp(t, 0.0, 1.0);
}

vec2 sat(vec2 t) {
    return clamp(t, 0.0, 1.0);
}

//remaps inteval [a;b] to [0;1]
float remap(float t, float a, float b) {
    return sat((t - a) / (b - a));
}

//note: /\ t=[0;0.5;1], y=[0;1;0]
float linterp(float t) {
    return sat(1.0 - abs(2.0 * t - 1.0));
}

vec3 spectrum_offset(float t) {
    float t0 = 3.0 * t - 1.5;
    //return vec3(1.0/3.0);
    return clamp(vec3(-t0, 1.0 - abs(t0), t0), 0.0, 1.0);
}

//note: [0;1]
float rand(vec2 n) {
    return fract(sin(dot(n.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

//note: [-1;1]
float srand(vec2 n) {
    return rand(n) * 2.0 - 1.0;
}

float mytrunc(float x, float num_levels)
{
    return floor(x * num_levels) / num_levels;
}
vec2 mytrunc(vec2 x, float num_levels)
{
    return floor(x * num_levels) / num_levels;
}

uniform float time;
uniform vec2 resolution;

void main()
{
    float aspect = resolution.x / resolution.y;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.y = 1.0 - uv.y;

    float time2 = mod(time, 32.0);// + modelmat[0].x + modelmat[0].z;

    float GLITCH = rand(vec2(time2 * 0.1, 0.0)) * 0.5 + 0.5;

    //float rdist = length( (uv - vec2(0.5,0.5))*vec2(aspect, 1.0) )/1.4;
    //GLITCH *= rdist;

    float gnm = sat(GLITCH);
    float rnd0 = rand(mytrunc(vec2(time2, time2), 6.0));
    float r0 = sat((1.0 - gnm) * 0.7 + rnd0);
    float rnd1 = rand(vec2(mytrunc(uv.x, 10.0 * r0), time2));//horz
    //float r1 = 1.0f - sat( (1.0f-gnm)*0.5f + rnd1 );
    float r1 = 0.5 - 0.5 * gnm + rnd1;
    r1 = 1.0 - max(0.0, ((r1 < 1.0) ? r1 : 0.9999999));//note: weird ass bug on old drivers
    float rnd2 = rand(vec2(mytrunc(uv.y, 40.0 * r1), time2));//vert
    float r2 = sat(rnd2);

    float rnd3 = rand(vec2(mytrunc(uv.y, 10.0 * r0), time2));
    float r3 = (1.0 - sat(rnd3 + 0.8)) - 0.1;

    float pxrnd = rand(uv + time2);

    float ofs = 0.05 * r2 * GLITCH * (rnd0 > 0.5 ? 1.0 : -1.0);
    ofs += 0.5 * pxrnd * ofs;

    uv.y += 0.1 * r3 * GLITCH;

    const int NUM_SAMPLES = 10;
    const float RCP_NUM_SAMPLES_F = 1.0 / float(NUM_SAMPLES);

    vec4 sum = vec4(0.0);
    vec3 wsum = vec3(0.0);
    for (int i = 0; i < NUM_SAMPLES; ++i)
    {
        float t = float(i) * RCP_NUM_SAMPLES_F;
        uv.x = sat(uv.x + ofs * t);
        vec4 samplecol = vec4(rand(uv) * 0.1, rand(uv) * 0.1, rand(uv) * 0.1, 0.1);
        vec3 s = spectrum_offset(t);
        samplecol.rgb = samplecol.rgb * s;
        sum += samplecol;
        wsum += s;
    }
    sum.rgb /= wsum;
    sum.a *= RCP_NUM_SAMPLES_F;

    //fragColor = vec4( sum.bbb, 1.0 ); return;

    gl_FragColor.a = sum.a;
    gl_FragColor.rgb = sum.rgb;// * outcol0.a;
}