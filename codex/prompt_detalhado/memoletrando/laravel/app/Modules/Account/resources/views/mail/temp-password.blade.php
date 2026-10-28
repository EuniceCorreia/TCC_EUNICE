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
        Recebemos uma solicitação para redefinição de senha na
        Loja {{ $fantasy_name }}.
        Geramos a senha temporária abaixo:
    </span>
</p>

<p>
    <br>
    <br>
   <h3>{{ $temp_password }}</h3>
</p>
<br>
@endsection

@section('outro')
@endsection

@section('notes')
Caso não tenha solicitado esta senha temporária, por favor nos contate.
@endsection

@section('footer')
<p>{{ $fantasy_name }}</p>
<p>
	<a href="{{ url('/') }}" style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#3869d4" target="_blank" >
		Acesse o site
	</a>
</p>
@endsection
