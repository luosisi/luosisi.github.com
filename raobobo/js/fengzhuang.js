/**
 * Created by Admin on 2016/1/19.
 */
$.fn.scrollUnique=function(){
    return $(this).each(function(){
        var eventype="mousewheel";
        if(document.mozHidden !==undefined){
            eventype="DOMMouseScroll"
        }
        $(this).on(eventype,function(event){
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE������¹������Խ�߽�ֱ��Ӱ�츸����������ˣ��ٽ�ʱ���ֶ��߽������λ
                this.scrollTop = delta > 0? 0: scrollHeight;
                // ���Ϲ� || ���¹�
               event.preventDefault();
            }
        })
    })
}


if ('getContext' in document.createElement('canvas')) {
    HTMLImageElement.prototype.play = function() {
        if (this.storeCanvas) {
            // �Ƴ��洢��canvas
            this.storeCanvas.parentElement.removeChild(this.storeCanvas);
            this.storeCanvas = null;
            // ͸���Ȼ�ԭ
            image.style.opacity = '';
        }
        if (this.storeUrl) {
            this.src = this.storeUrl;
        }
    };
    HTMLImageElement.prototype.stop = function() {
        var canvas = document.createElement('canvas');
        // �ߴ�
        var width = this.width, height = this.height;
        if (width && height) {
            // �洢֮ǰ�ĵ�ַ
            if (!this.storeUrl) {
                this.storeUrl = this.src;
            }
            // canvas��С
            canvas.width = width;
            canvas.height = height;
            // ����ͼƬ֡����һ֡��
            canvas.getContext('2d').drawImage(this, 0, 0, width, height);
            // ���õ�ǰͼƬ
            try {
                this.src = canvas.toDataURL("image/gif");
            } catch(e) {
                // ����
                this.removeAttribute('src');
                // ����canvasԪ��
                canvas.style.position = 'absolute';
                // ǰ�����ͼƬ
                this.parentElement.insertBefore(canvas, this);
                // ����ԭͼ
                this.style.opacity = '0';
                // �洢canvas
                this.storeCanvas = canvas;
            }
        }
    };
}

var image = document.getElementById("testImg"),
    button = document.getElementById("testBtn");

if (image && button) {
    button.onclick = function() {
        if (this.value == 'ֹͣ') {
            image.stop();
            this.value = '����';
        } else {
            image.play();
            this.value = 'ֹͣ';
        }
    };
}