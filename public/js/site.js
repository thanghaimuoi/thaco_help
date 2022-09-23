$(function () {
    $("#mask").fadeOut(500, function () {
        $("#mask").remove();
    });

    $(".lib-img").click(function () {
        if (!$(this).hasClass("anbum")) {
            $(".main-img>img").attr("src", $(this).attr("src"));
        }
        $(".lib-img").removeClass("active");
        $(this).addClass("active");
    });

    $(".expand").click(function () {
        $("#image-show").removeClass("d-none");
        $("#image-show>img").attr("src", $(".main-img>img").attr("src"));
    });

    $(".lib-img.anbum").click(function () {
        $("#image-show").removeClass("d-none");
        $("#image-show>img").attr("src", $(".lib-img.active").attr("src"));
    });

    $("#image-show>.close,#video-show>.close").click(function () {
        $(this).parent().addClass("d-none");
        if ($(this).parent("#video-show").length > 0) {
            $("#video-show>iframe").attr("src", "");
        }
    });

    $('.img-nav').click(function () {
        $imageShow = $("#image-show>img:first");
        var $currentImg = $(".lib-img.active");
        var $nextImg = $currentImg.parent();
        if ($(this).hasClass("right")) {
            $nextImg = $nextImg.next().find("img");
        } else {
            $nextImg = $nextImg.prev().find("img");
        }
        if ($nextImg.length != 0) {
            $imageShow.attr("src", $nextImg.attr("src"));
            $nextImg.addClass("active");
            $currentImg.removeClass("active");
        }
    });

    $(".video-list .info-list-item").click(function () {
        var $this = $(this);
        $(".info-list-item").removeClass("active");
        $this.addClass("active");
        var url = "https://www.youtube.com/embed/" + $this.attr("video-url");
        $("#youtube-player").attr("src", url);
    });

    $(".lib-video:not(.anbum)").click(function () {
        $(".lib-img").removeClass("active");
        $(this).addClass("active");
        $(".main-video>iframe").attr("src", "https://www.youtube.com/embed/" + $(this).attr("youtube-url"));
    });

    $(".lib-video.anbum").click(function () {
        $("#video-show").removeClass("d-none");
        var height = $("#video-show>iframe").width() * 0.7;
        height = height > 0.8 * $("#video-show").height() ? 0.8 * $("#video-show").height() : height;
        $("#video-show>iframe").css("height", height + "px")
        $("#video-show>iframe").attr("src", "https://www.youtube.com/embed/" + $(this).attr("youtube-url"));
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $('#toTopBtn').fadeIn(400, function () {
                $(this).removeClass("d-none");
            });
        } else {
            $('#toTopBtn').fadeOut(400, function () {
                $(this).addClass("d-none");
            });
        }
    });

    $('#toTopBtn').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    $("#loginBt").click(async function () {
        $(".login-form .alert").fadeOut();
        let $form = $(this).parents('form');
        let item = {}
        let valueArray = $form.serializeArray()
        for (let value of valueArray) {
            if (value.value != null && value.value != '' && value.value != undefined) {
                item[value.name] = value.value;
            }
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            let url = `/api/login`;
            fetch(url, options).then(async (response) => {
                if (response.ok) {
                    item = await response.json();
                    //setCookie('token', item.token, 30);
                    let $accountInfo = $('.account-info');

                    $('.login-form').css('display', 'none');
                    $accountInfo.fadeIn();

                    $accountInfo.find(".user-img").text(item.account.name.substring(0, 1));
                    $accountInfo.find(".name").text(item.account.name);
                    $accountInfo.find(".email").text(item.account.email);
                    reloadScheduler(item.account);
                } else {
                    let error = await response.text();
                    $(".login-form .alert").text(error).fadeIn();
                }
            });
        } catch (error) {
            console.log(error);
        }
    });

    $("#logoutBt").click(async function () {
        const options = {
            method: 'POST'
        }
        try {
            let url = `/api/logout`;
            fetch(url, options).then(async (response) => {
                if (response.ok) {
                    $("#loginForm").show();
                    $(".account-info").hide();
                } else {
                    alert("Logout thất bại");
                }
            });
        } catch (error) {
            console.log(error);
        }
    });

    $('.regisScheduler').click(async function (params) {
        let $thisBt = $(this);
        let schedulerId = $(this).attr("schedulerId");
        $(this).attr('disabled', 'true');
        $thisBt.html('<i class="fas fa-spinner fa-spin"></i> Đang đăng ký');
        let postData = {
            schedulerId
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            let url = `/api/scheduler/register`;
            fetch(url, options).then(async (response) => {
                if (response.ok) {
                    item = await response.json();
                    $thisBt.html('<i class="fas fa-check"></i> Đã đăng ký');
                } else {
                    let error = await response.text();
                    if (response.status == 401) {
                        $('#messagebox-info').text("Vui lòng đăng nhập để đăng ký khóa học này.");
                        $('#messageInfo').modal('show');
                    } else {
                        alert(error);
                    }
                    $(this).text('Đăng ký ngay');
                    $thisBt.removeAttr("disabled");
                }
            });
        } catch (error) {
            console.log(error);
        }
    });

    function reloadScheduler(account) {
        let regisScheduler = account.schedulers.map(q => q.schedulerId.toString());
        $('.regisScheduler').each(function (index) {
            if (regisScheduler.indexOf($(this).attr("schedulerId")) != -1) {
                $(this).html('<i class="fas fa-check"></i> Đã đăng ký');
                $(this).attr('disabled', 'true');
            } else {
                $(this).text('Đăng ký ngay');
                $(this).removeAttr('disabled');
            }
        });
    }

    $('.download-document').click(function (ev) {
        let $file = $(this);
        let id = $file.attr('id');
        if (id) {
            let url = `/tai-lieu/${id}`;
            fetch(url);
        }
    })
    if ($(window).width() < 992) {
        $('.dropdown-item.narrow').each(function () {
            var $this = $(this);
            $this.prepend('<div class="after"><i class="fa fa-sort-down"></i></div>');
        });

        $('.dropdown-item.narrow .after').click(function (e) {
            e.preventDefault();
            let $menu = $(this).parent().parent().find(".dropdown-menu");
            $menu.toggle();
            return false;
        });
    }
});