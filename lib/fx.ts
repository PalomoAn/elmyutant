export const FX_KEY = "elmyutant-fx";

export type Fx = { scan: boolean; glow: boolean; motion: boolean };

// Runs in <head> before the page paints. Plain JS, so it's a string.
export const FX_SCRIPT = `(function(){try{
var v=JSON.parse(localStorage.getItem("${FX_KEY}")||"{}");
var d=document.documentElement;
var reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
d.dataset.scan=v.scan===false?"off":"on";
d.dataset.glow=v.glow===false?"off":"on";
d.dataset.motion=(v.motion===undefined?!reduced:v.motion)?"on":"off";
}catch(e){}})();`;