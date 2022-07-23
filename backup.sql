PGDMP     8                    z        	   stock_app    14.4    14.4                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16497 	   stock_app    DATABASE     ^   CREATE DATABASE stock_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE stock_app;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            �            1259    17850    cash_balance    TABLE     �   CREATE TABLE public.cash_balance (
    id integer NOT NULL,
    user_id integer,
    username character varying,
    cash_balance numeric
);
     DROP TABLE public.cash_balance;
       public         heap    postgres    false    3            �            1259    17849    cash_balance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cash_balance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.cash_balance_id_seq;
       public          postgres    false    212    3                       0    0    cash_balance_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.cash_balance_id_seq OWNED BY public.cash_balance.id;
          public          postgres    false    211            �            1259    17999    holdings    TABLE     �   CREATE TABLE public.holdings (
    id integer NOT NULL,
    user_id integer,
    username character varying,
    company_name character varying,
    company_symbol character varying,
    current_shares integer,
    total_cost_basis numeric
);
    DROP TABLE public.holdings;
       public         heap    postgres    false    3            �            1259    17998    holdings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.holdings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.holdings_id_seq;
       public          postgres    false    216    3                        0    0    holdings_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.holdings_id_seq OWNED BY public.holdings.id;
          public          postgres    false    215            �            1259    17984    transactions    TABLE     M  CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer,
    company_name character varying,
    company_symbol character varying,
    shares integer,
    cost_basis numeric,
    transaction_type character varying,
    transaction_total numeric,
    transaction_date timestamp with time zone DEFAULT now()
);
     DROP TABLE public.transactions;
       public         heap    postgres    false    3            �            1259    17983    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false    214    3            !           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public          postgres    false    213            �            1259    17824    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    signedin character varying,
    date_created timestamp with time zone DEFAULT now()
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            �            1259    17823    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210    3            "           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    209            z           2604    17853    cash_balance id    DEFAULT     r   ALTER TABLE ONLY public.cash_balance ALTER COLUMN id SET DEFAULT nextval('public.cash_balance_id_seq'::regclass);
 >   ALTER TABLE public.cash_balance ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            }           2604    18002    holdings id    DEFAULT     j   ALTER TABLE ONLY public.holdings ALTER COLUMN id SET DEFAULT nextval('public.holdings_id_seq'::regclass);
 :   ALTER TABLE public.holdings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            {           2604    17987    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            x           2604    17827    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2606    17857    cash_balance cash_balance_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.cash_balance
    ADD CONSTRAINT cash_balance_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.cash_balance DROP CONSTRAINT cash_balance_pkey;
       public            postgres    false    212            �           2606    18006    holdings holdings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.holdings
    ADD CONSTRAINT holdings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.holdings DROP CONSTRAINT holdings_pkey;
       public            postgres    false    216            �           2606    17992    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    214                       2606    17832    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            �           2606    17834    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    210            �           2606    17858 &   cash_balance cash_balance_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cash_balance
    ADD CONSTRAINT cash_balance_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.cash_balance DROP CONSTRAINT cash_balance_user_id_fkey;
       public          postgres    false    210    3455    212            �           2606    17863 '   cash_balance cash_balance_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cash_balance
    ADD CONSTRAINT cash_balance_username_fkey FOREIGN KEY (username) REFERENCES public.users(username);
 Q   ALTER TABLE ONLY public.cash_balance DROP CONSTRAINT cash_balance_username_fkey;
       public          postgres    false    212    3457    210            �           2606    18007    holdings holdings_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.holdings
    ADD CONSTRAINT holdings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 H   ALTER TABLE ONLY public.holdings DROP CONSTRAINT holdings_user_id_fkey;
       public          postgres    false    3455    216    210            �           2606    18012    holdings holdings_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.holdings
    ADD CONSTRAINT holdings_username_fkey FOREIGN KEY (username) REFERENCES public.users(username);
 I   ALTER TABLE ONLY public.holdings DROP CONSTRAINT holdings_username_fkey;
       public          postgres    false    210    3457    216            �           2606    17993 &   transactions transactions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_user_id_fkey;
       public          postgres    false    210    214    3455           