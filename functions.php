<?php

add_action( 'after_setup_theme', 'jtheme_setup' );
function jtheme_setup() {
    load_theme_textdomain( 'jtheme', get_template_directory() . '/languages' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'post-thumbnails' );
    global $content_width;
    if ( ! isset( $content_width ) ) $content_width = 640;
    register_nav_menus(
    array( 'main-menu' => __( 'Main Menu', 'jtheme' ) )
    );
}

add_action( 'wp_enqueue_scripts', 'jtheme_load_scripts' );
function jtheme_load_scripts() {
    
    wp_enqueue_style( 'bootstrap_css', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css');
    wp_enqueue_style( 'custom_css', get_template_directory_uri() . '/css/index.css');
    
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'bootstrap_js', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js');
    wp_enqueue_script( 'custom_js', get_template_directory_uri() . '/js/index.js');
    
}

add_action( 'comment_form_before', 'jtheme_enqueue_comment_reply_script' );
function jtheme_enqueue_comment_reply_script() {
    if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
}

add_filter( 'the_title', 'jtheme_title' );
function jtheme_title( $title ) {
    if ( $title == '' ) {
        return '&rarr;';
    } else {
        return $title;
    }
}

add_filter( 'wp_title', 'jtheme_filter_wp_title' );
function jtheme_filter_wp_title( $title ) {
    return $title . esc_attr( get_bloginfo( 'name' ) );
}

add_action( 'widgets_init', 'jtheme_widgets_init' );
function jtheme_widgets_init() {
    register_sidebar( array (
    'name' => __( 'Sidebar Widget Area', 'jtheme' ),
    'id' => 'primary-widget-area',
    'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
    'after_widget' => "</li>",
    'before_title' => '<h3 class="widget-title">',
    'after_title' => '</h3>',
    ) );
}

function jtheme_custom_pings( $comment ) {
    $GLOBALS['comment'] = $comment;
    ?>
    <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
    <?php 
}

add_filter( 'get_comments_number', 'jtheme_comments_number' );
function jtheme_comments_number( $count ) {
    if ( !is_admin() ) {
        global $id;
        $comments_by_type = &separate_comments( get_comments( 'status=approve&post_id=' . $id ) );
        return count( $comments_by_type['comment'] );
    } else {
        return $count;
    }
}