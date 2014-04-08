var YPhoto = (function() {
	var currentAlbum = '';

	var GetPhotos = function(data, albumId) {
		for(var i=0; i < data.entries.length; i++) {
			$('#photosTmpl').tmpl(data.entries[i]).appendTo('#'+albumId);
		}
		data.id = albumId;

		$('#nextTmpl').tmpl(data).appendTo('#next');

		$('.pics').glisse({
			changeSpeed: 550,
			speed: 500,
			effect:'bounce',
			fullscreen: true
		});
	};

	return {

        getServiceDocument: function(login) {
            $.ajax({
                type: "GET",
                crossDomain: true,
                dataType: "jsonp",
                url: "http://api-fotki.yandex.ru/api/users/" + login + "/?format=json"
            }).done(function(data) {
                $('#mainTmpl').tmpl(data).appendTo('#updateAjaxDiv');
            });
        },

		getAlbums: function(url) {
			$.ajax({
				type: "GET",
				crossDomain: true,
				dataType: "jsonp",
				url: url + "?format=json"
			}).done(function(data) {
                $('#albums a').tab('show');

				for(var i=0; i < data.entries.length; i++) {
					$('#albumTmpl').tmpl(data.entries[i]).appendTo('#album-bag .row');
				}
			});
		},

        getPhotos: function(url) {
            $.ajax({
                type: "GET",
                crossDomain: true,
                dataType: "jsonp",
                url: url + "?format=json"
            }).done(function(data) {
                $('#photos a').tab('show');

                for(var i=0; i < data.entries.length; i++) {
                    $('#photosTmpl').tmpl(data.entries[i]).appendTo('#photo-bag .row');
                }
            });
        },

        getTags: function(url) {
            $.ajax({
                type: "GET",
                crossDomain: true,
                dataType: "jsonp",
                url: url + "?format=json"
            }).done(function(data) {
                $('#tags a').tab('show');

                for(var i=0; i < data.entries.length; i++) {
                    $('#tagsTmpl').tmpl(data.entries[i]).appendTo('#tag-bag .list-group');
                }
            });
        },

		getPhotosInAlbum: function(url, albumId, showNext) {
			$.ajax({
				type: "GET",
				crossDomain: true,
				dataType: "jsonp",
				url: url
			}).done(function(data) {

				$('#next input').remove();
				if (showNext) {
					GetPhotos(data, albumId);
				}
				else if(!$('#photos > ' + '#' + albumId + ' > div').is('.photo') || currentAlbum != albumId) {
					$('#photos > div').hide();
					$('#'+albumId).show();
					GetPhotos(data, albumId);
				}

				currentAlbum = albumId;
			});
		}
	}

}());