from diplom.utils import error_dict


def base_handler(e):
	return error_dict(str(e)), 400
