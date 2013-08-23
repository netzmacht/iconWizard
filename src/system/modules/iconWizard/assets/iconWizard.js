
var iconWizard = new Class(
{

    initialize: function(elementId) {
        this.fxScroll = new Fx.Scroll(window);

        // wizard elements
        this.input = $(parent.document).getElementById(elementId);
        this.wizard = this.input.getParent('.iconWizard');
        this.title = this.wizard.getElement('.title');
        this.icon = this.wizard.getElement('.icon');

        // popup elements
        this.containers = $$('.icon_container');
        this.groups = $$('.icon_group');
        this.reset = $('reset');
        this.search = $('search');

        // register events
        this.containers.each(function(el) {
            el.addEvent('click', this.selectIcon.bindWithEvent(this, [el]));
        }.bind(this));

        this.reset.addEvent('click', this.resetSelection.bindWithEvent(this, [this.reset]));
        this.search.addEvent('keyup', this.searchIcon.bindWithEvent(this, [this.search]));
        this.search.addEvent('change', this.searchIcon.bindWithEvent(this, [this.search]));

        // select current icon
        var el = $('icon_container_' + this.input.get('value'));

        if(el != null)  {
            el.addClass('active');
            this.fxScroll.start(0, el.getPosition().y - 40);
        }
    },

    selectIcon: function(e, el) {
        this.containers.removeClass('active');

        el.addClass('active');
        this.input.set('value', el.getElement('.title').get('text'));

        this.icon.set('html', el.getElement('.icon').get('html'));
        this.title.set('text', el.getElement('.title').get('text'));
    },

    resetSelection: function(e, el) {
        e.preventDefault();
        e.stop();

        console.log(el);

        this.containers.removeClass('invisible');
        this.groups.removeClass('invisible');

        this.input.set('value', '');
        this.icon.set('html', '');
        this.icon.set('text', '-');
    },

    searchIcon: function(e, el) {
        var val = el.get('value');

        if(val.length > 2) {
            this.groups.each(function(group) {
                var empty = true;

                group.getElements('.icon_container').each(function(container) {
                    if(!container.getElement('.title').get('text').test(val)) {
                        container.addClass('invisible');
                    }
                    else {
                        container.removeClass('invisible');
                        empty = false;
                    }
                });

                if(empty) {
                    group.addClass('invisible');
                }
            });

            this.fxScroll.start(0, 0);
        }
        else {
            this.groups.removeClass('invisible');
            this.containers.removeClass('invisible');
        }
    }

});