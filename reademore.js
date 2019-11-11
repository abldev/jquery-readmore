/************************************ BEGIN READMORE PLUGIN ************************************/
/**
 * Readmore
 */

(function ( $ ) {
 
    var VERSION = '0.0.1',
        pluginName = 'readmore',
        conf = {
            link_class: '--readmore--link',
            substr_class: '--readmore--sbstr',
            full_txt_class: '--readmore--txt'
        };

    /**
     * Plugin constructor
     * @param {Node} element
     * @param {Object} [options]
     * @api public
     */
    function Readmore (el, options) {
        this.el = el;
        this.$el = $(el);
        this.opts = $.extend({}, $.fn.readmore.defaults, this.$el.data(), options);
        this.open = false;
        this.init();
    }

    Readmore.prototype.VERSION = VERSION;

    /**
     * Init 
     */
    Readmore.prototype.init = function() {
        this.open = false;
        var text = $.trim(this.$el.text());
        var text_len = text.length;

        if (text_len > this.opts.maxChar) {
            var endChar_len = this.opts.endChar.length;
            text_substr = '<span class="'+ conf.substr_class +'">'+ text.substring(0, (this.opts.maxChar - endChar_len)) + this.opts.endChar + '</span>'
            text_substr += '<span style="display:none" class="'+ conf.full_txt_class +'">'+ text + '</span>'

            if (this.opts.link) {
                this.$el.html( text_substr + ' <a href="javascript:void(0);" class="'+ conf.link_class +'">' + this.opts.readMoreTitle + '</a>');
            } else {
                this.$el.html(text_substr);
            }
        }
        
        this.$el.data('init', 1);
        this.$el.on('click', '.' + conf.link_class, this.handleClick.bind(this));
    }

    /**
     * handleClick 
     */
    Readmore.prototype.handleClick = function() {
        if (this.open) {
            this.collapse();
        } else {
            this.expand();
        }
    }

    /**
     * Exapnd 
     */
    Readmore.prototype.expand = function() {
        $('.' + conf.substr_class, this.$el).hide();
        $('.' + conf.full_txt_class, this.$el).show();
        $('.' + conf.link_class, this.$el).text(this.opts.showLessTitle);
        
        this.open = true;
    }

    /**
     * Collapse
     */
    Readmore.prototype.collapse = function() {
        $('.' + conf.full_txt_class, this.$el).hide();
        $('.' + conf.substr_class, this.$el).show();
        $('.' + conf.link_class, this.$el).text(this.opts.readMoreTitle);
        this.open = false;
    }

    /**
     * jQuery plugin definition
     */
    $.fn.readmore = function (options) {
        return this.each(function () {
            var init = $(this).data('init');
            if (!init) {
                new Readmore(this, options);
            }
        });
    };

    // $.fn.readmore.Constructor = Readmore;

    /**
     * jQuery plugin defaults
     */
    $.fn.readmore.defaults = {
        maxChar: 150,
        readMoreTitle: "Redemore",
        showLessTitle: "Show less",
        endChar: "...",
        link: false
    };
 
}( jQuery ));

/************************************ END READMORE PLUGIN ************************************/
