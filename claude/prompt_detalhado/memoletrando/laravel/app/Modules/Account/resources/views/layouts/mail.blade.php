<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;background-color:#f5f8fa;color:#74787e;height:100%;line-height:1.4;margin:0;width:100%!important;word-break:break-word">
	<table style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;background-color:#f5f8fa;margin:0;padding:0;width:100%" width="100%" cellspacing="0" cellpadding="0">
		<tbody>
			<tr>
				<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box" align="center">
					<table style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;margin:0;padding:0;width:100%" width="100%" cellspacing="0" cellpadding="0">
						<tbody>
							<tr>
								<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:25px 0;text-align:center">
									@yield('header')
								</td>
							</tr>
							<tr>
								<td cellpadding="0" cellspacing="0" style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;background-color:#ffffff;border-bottom:1px solid #edeff2;border-top:1px solid #edeff2;margin:0;padding:0;width:100%" width="100%">
									<table style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;background-color:#ffffff;margin:0 auto;padding:0;width:570px" width="570" cellspacing="0" cellpadding="0" align="center">
										<tbody>
											<tr>
												<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px">
													<h1 style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#2f3133;font-size:19px;font-weight:bold;margin-top:0;text-align:left">
														@yield('intro-h1')
													</h1>
													<p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
														@yield('intro-p')
													</p>
													<table style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;margin:30px auto;padding:0;text-align:center;width:100%" width="100%" cellspacing="0" cellpadding="0" align="center">
														<tbody>
															<tr>
																<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box" align="center">
																	<table style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box" width="100%" cellspacing="0" cellpadding="0" border="0">
																		<tbody>
																			<tr>
																				<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box" align="center">
																					<table style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box" cellspacing="0" cellpadding="0" border="0">
																						<tbody>
																							<tr>
																								<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box">
																									@yield('content')
																								</td>
																							</tr>
																						</tbody>
																					</table>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
													@yield('outro')
													<!-- <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our application!</p>
													<p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Regards,<br>Integrar</p> -->
													<table style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;border-top:1px solid #edeff2;margin-top:25px;padding-top:25px" width="100%" cellspacing="0" cellpadding="0">
														<tbody>
															<tr>
																<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box">
																	<p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;line-height:1.5em;margin-top:0;text-align:left;font-size:12px">
																		@yield('notes')
																	</p>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box">
									<table class="m_9110515025675959336footer" style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;margin:0 auto;padding:0;text-align:center;width:570px" width="570" cellspacing="0" cellpadding="0" align="center">
										<tbody>
											<tr>
												<td style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px" align="center">
													<p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;line-height:1.5em;margin-top:0;color:#aeaeae;font-size:12px;text-align:center">
														@yield('footer')
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</div>
