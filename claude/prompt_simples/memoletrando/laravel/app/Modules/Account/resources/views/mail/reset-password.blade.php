@extends('sg.account::layouts.mail')

@section('header')
<a href="{{ url('/') }}" target="_blank">
	<img style="max-height:70px;" src="{{ asset('site/images/icon.png') }}">
</a>
@endsection

@section('intro-h1')
@endsection

@section('intro-p')
@endsection

@section('content')
<p>
    <span style="font-weight: bold">
        We received a request to reset the password, here is the code to continue the process::
    </span>
    <h4>{{ $token }}</h4>
    </span style="font-weight: bold">
    If you did not request this reset, please ignore this email.
    </span>
</p>
<br>
@endsection

@section('outro')
@endsection

@section('notes')
@endsection

@section('footer')
<p>{{ $fantasy_name }}</p>
<p>
	<a href="{{ url('/') }}" style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#3869d4" target="_blank" >
		Acesse o site
	</a>
</p>
@endsection
