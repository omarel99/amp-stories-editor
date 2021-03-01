var $ = require('jquery');

function generateInlineCss( obj ){
  //@obj - data.pages.page1.title.css
  //pass css obj and generate string of inline params
    return ( `color:${obj.color};
     font-family:${obj.font};
     font-size:${obj.size}px;
     font-weight:${obj.weight};`);
}

function generateSlide( pageObj, inCenter ){
    //@params pageObj - page obj in GLOBAL data that represent slide
    //@params isCenter - if slider is in center display (this slider is interactive)
    console.log({ pageObj, inCenter});
    let dragableClass = inCenter ? "dragableText" : ""; //class for drag and drop

    return (
    ` <div class="" id='page${pageObj.id}'>
        <div class="c-canvas__bcg-img" data-page="page${pageObj.id}" data-name="background">
            <img src="${pageObj.background.src}" alt="">
        </div>
        <div class="c-canvas__title ${dragableClass}" data-page="page${pageObj.id}" data-name="title">
            <h1
            class="title"
            style="${generateInlineCss(pageObj.title.css)}"
            >${pageObj.title.text}</h1>
        </div>
        <div class="c-canvas__description ${dragableClass}" data-page="page${pageObj.id}" data-name="description">
            <p
            class="description"
            style="${generateInlineCss(pageObj.description.css)}"
            >${pageObj.description.text}</p>
        </div>
    </div>`);
}

//FOR EXPORT ONLY
module.exports = {
    addSlide( parentSelector, data ){
        //ads new slide - amp-story-page
        //@param parentSelector - wrapper(parent) of 3 slides(.c-canvas)
        //@param data - global data object

        let sliderData    = data.slider,
        leftSlide         = parentSelector.find(".c-canvas--left"),
        centerSlide       = parentSelector.find(".c-canvas--center"),
        rightSlide        = parentSelector.find(".c-canvas--right"),
        slideshow         = $(".b-slider"),
        slideshowDots     = slideshow.find('.b-slider__dots'),
        slideshowCount    = slideshow.find('.b-slider__current-num span');

        //console.log(typeof sliderData.count);
        //console.log(typeof sliderData.currentSlide);

        sliderData.count++;//increment num of slides
        sliderData.currentSlide = sliderData.count; //increase current slide by 1
        //console.log(sliderData.count);

        //clone current slide to left position


        //add new slide to GLOBAL data obj
        let newSlide = {
            id:sliderData.count,
            background:{
                toolForEdit:"editBcg",
                src:"img/placeholder.jpg",
            },
            //item on canvas
            title:{
                toolForEdit:"editText", //tool used to edit this item
                text:'Dummy Title', //label - text of item
                //css of item
                css:{
                    color:"#ff0000",
                    font:"Monospace",
                    size:"32",
                    weight:'400'
                }
            },
            description:{
                toolForEdit:"editText",
                text:'Dummy Description text, type here your content.',
                css:{
                    color:"#ffffff",
                    font:"Helvetica",
                    size:"24",
                    weight:'400',
                }
            }
        };

        //add new page to GLOBAL data
        data.pages[`page${sliderData.count}`] = newSlide;

        //add new slide in center slider
        centerSlide.empty().append(
            generateSlide( newSlide, true )
        );

        //add previously center slide to the left
        if (sliderData.count > 1) {
            leftSlide.empty()
            .append(
                generateSlide( data.pages[`page${sliderData.currentSlide - 1}`], false )
            );
        }

        //empty last slide, since we are on last at CENTER
        rightSlide.empty();

        //add dot
        slideshowDots.find('.current').removeClass('current');
        slideshowDots.append(`<span class='dot current'></span>`);

        //increase curent slide display number
        slideshowCount.text(sliderData.count);

        console.log(data);
    },

    prevSlide( parentSelector, data ){
        //slides to prev
        //@param parentSelector - wrapper(parent) of 3 slides(.c-canvas)
        //@param data - global data object

        let sliderData    = data.slider,
        leftSlide         = parentSelector.find(".c-canvas--left"),
        centerSlide       = parentSelector.find(".c-canvas--center"),
        rightSlide        = parentSelector.find(".c-canvas--right"),
        slideshow         = $(".b-slider"),
        slideshowDots     = slideshow.find('.b-slider__dots'),
        slideshowCount    = slideshow.find('.b-slider__current-num span');

        console.log(sliderData.currentSlide)

        if( sliderData.currentSlide == 1 ){
            //if on first slide exit - no prev slides
            console.log('YOU ARE ON FIRST SLIDE');
            return
        }

        //move central slider to right
        rightSlide.empty()
        .append(
            generateSlide( data.pages[`page${sliderData.currentSlide}`], false )
        );

        sliderData.currentSlide--; //decrease current slide by 1

        //add central slide, which was on left
        centerSlide.empty()
        .append(
            generateSlide( data.pages[`page${sliderData.currentSlide}`], true )
        );

        if( sliderData.currentSlide > 1 ){
            leftSlide.empty()
            .append(
                generateSlide( data.pages[`page${sliderData.currentSlide - 1}`], false )
            );
        }else{
            leftSlide.empty()
        }

        //add dot
        slideshowDots.find('.current').removeClass('current').prev().addClass('current');

        //increase curent slide display number
        slideshowCount.text(sliderData.currentSlide);

    },

    nextSlide( parentSelector, data ){
        //slides to next
        //@param parentSelector - wrapper(parent) of 3 slides(.c-canvas)
        //@param data - global data object

        let sliderData    = data.slider,
        leftSlide         = parentSelector.find(".c-canvas--left"),
        centerSlide       = parentSelector.find(".c-canvas--center"),
        rightSlide        = parentSelector.find(".c-canvas--right"),
        slideshow         = $(".b-slider"),
        slideshowDots     = slideshow.find('.b-slider__dots'),
        slideshowCount    = slideshow.find('.b-slider__current-num span');

        console.log(sliderData.currentSlide)

        if( sliderData.currentSlide == sliderData.count ){
            //if on last slide exit - no next slides
            console.log('YOU ARE ON LAST SLIDE');
            return
        }

        //move central slider to left
        leftSlide.empty()
        .append(
            generateSlide( data.pages[`page${sliderData.currentSlide}`], false )
        );

        sliderData.currentSlide++; //increase current slide by 1

        //add central slide, which was on right
        centerSlide.empty()
        .append(
            generateSlide( data.pages[`page${sliderData.currentSlide}`], true )
        );

        if( sliderData.currentSlide < sliderData.count ){
            rightSlide.empty()
            .append(
                generateSlide( data.pages[`page${sliderData.currentSlide + 1}`], false )
            );
        }else{
            rightSlide.empty()
        }

        //add dot
        slideshowDots.find('.current').removeClass('current').next().addClass('current');

        //increase curent slide display number
        slideshowCount.text(sliderData.currentSlide);


    }
}
