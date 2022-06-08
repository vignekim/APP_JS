$(() => {

    const e1 = (v, i, b, t) => {
        const styleArray = [
            "slide_left_out 2s forwards", "slide_left_in 2s ease-out"
        ];
        var cssType = "";

        if(v > b) {
            if(t) {
                cssType = styleArray[0];
            } else {
                cssType = styleArray[1];
            }
        } else {
            if(t) {
                cssType = styleArray[1];
            } else {
                cssType = styleArray[0];
            }
        }

        $("section div").eq(i).css("animation", cssType);
    };

    $(window).scroll(function(){
        let value = $(window).scrollTop();
        e1(value, 0, 100, true);
        e1(value, 2, 220, false);
    });
/*
    window.addEventListener("scroll", () => {
        let value = window.scrollY;
        let svh = window.innerHeight;

        if(value > 100) {
            $("section div").eq(0).css("animation", "slide_left_out 2s forwards");
        } else {
            $("section div").eq(0).css("animation", "slide_left_in 2s ease-out");
        }
        
        if(value < 200) {
            $("section div").eq(2).css("animation", "slide_left_out 2s forwards");
        } else {
            $("section div").eq(2).css("animation", "slide_left_in 2s ease-out");
        }
    });
*/
});