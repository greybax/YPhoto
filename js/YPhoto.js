var YPhoto = (function() {
	var current = '';
	
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
	}

	return {
		getAlbums: function() {
			$.ajax({
				type: "GET",
				crossDomain: true,
				dataType: "jsonp",
				url: "http://api-fotki.yandex.ru/api/users/aleks2042/albums/?format=json"
			}).done(function(data) {
				for(var i=0; i < data.entries.length; i++) {
					data.entries[i].id = 'album_' + i;
					$('#albumTmpl').tmpl(data.entries[i]).appendTo('.topRow');

					$('<div/>', {id: data.entries[i].id}).appendTo('#photos');
				}
			});
		},
		
		GetPhotosInAlbum: function(url, albumId, showNext = false) {
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
				else if(!$('#photos > ' + '#' + albumId + ' > div').is('.photo') || current != albumId) {
					$('#photos > div').hide();
					$('#'+albumId).show();
					GetPhotos(data, albumId);
				}

				current = albumId;
			});
		}		
	}
	
}());