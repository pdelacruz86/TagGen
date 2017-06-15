<template>
	<div class="page-wrapper-row">
		<div class="page-wrapper-top">
			<!-- BEGIN HEADER -->
			<div class="page-header">
				<!-- BEGIN HEADER TOP -->
				<div class="page-header-top">
					<div class="container">
						<!-- BEGIN LOGO -->
						<div class="page-logo">
							<a href="index.html">
								<img src="" alt="logo" class="logo-default">
								<!-- <img src="./assets/layouts/layout3/img/logo-default.jpg" alt="logo" class="logo-default"> -->
							</a>
						</div>
						<!-- END LOGO -->
						<!-- BEGIN RESPONSIVE MENU TOGGLER -->
						<a href="javascript:;" class="menu-toggler"></a>
						<!-- END RESPONSIVE MENU TOGGLER -->
						<!-- BEGIN TOP NAVIGATION MENU -->
						<app-top-header></app-top-header>
						<!-- END TOP NAVIGATION MENU -->

					</div>
				</div>
				<!-- END HEADER TOP -->
				<!-- BEGIN HEADER MENU -->
				<div class="page-header-menu">
					<div class="container">
						<!-- BEGIN MEGA MENU -->
						<!-- DOC: Apply "hor-menu-light" class after the "hor-menu" class below to have a horizontal menu with white background -->
						<!-- DOC: Remove data-hover="dropdown" and data-close-others="true" attributes below to disable the dropdown opening on mouse hover -->
						<div class="hor-menu  ">
							<ul class="nav navbar-nav">
								<li aria-haspopup="true" class="menu-dropdown classic-menu-dropdown">
									 <router-link :to="{ path: 'home' }">
                    					Home
										<span class="arrow"></span>
									</router-link>
								</li>
									<li aria-haspopup="true" class="menu-dropdown classic-menu-dropdown ">
										<a href="javascript:;"> Tags
											<span class="arrow"></span>
										</a>
										<ul class="dropdown-menu pull-left">
											<li aria-haspopup="true" class=" ">
											    <router-link :to="{ path: 'tags/portable' }">
							                        <i class="icon-bar-chart"></i> Portable Tag
							                        <span class="badge badge-success">1</span>
							                      </router-link>
											</li>
											<li aria-haspopup="true" class=" ">
												<a href="layout_top_bar_light.html" class="nav-link  "> Dynamic Tag </a>
											</li>
										</ul>
									</li>
								</ul>
							</li>

						</div>
						<!-- END MEGA MENU -->
					</div>
				</div>
				<!-- END HEADER MENU -->
			</div>
			<!-- END HEADER -->
		</div>
	</div>
</template>

<script>
  import TopHeader from './TopHeader.vue'

  export default {
    components: {appTopHeader: TopHeader}
  }
</script>

<style>

</style>

